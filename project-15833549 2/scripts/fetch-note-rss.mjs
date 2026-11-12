#!/usr/bin/env node
/**
 * noteの公式RSSを取得して、サイト表示用のデータ（src/data/noteArticles.ts）を生成します。
 * GitHub Actions（.github/workflows/update-feeds.yml）から1時間ごとに実行されます。
 * 手元で確認するときは `node scripts/fetch-note-rss.mjs` を実行してください。
 *
 * 取得に失敗した場合は、ファイルを書き換えず（＝前回取得分をそのまま残し）正常終了します。
 * これにより片方が失敗しても、もう片方の更新を止めません。
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');
const OUTPUT_FILE = resolve(PROJECT_ROOT, 'src/data/noteArticles.ts');

// 取得元の設定（環境変数で差し替え可能）
const RSS_URL = process.env.NOTE_RSS_URL || 'https://note.com/iandi_kominka/rss';
const SOURCE_URL = process.env.NOTE_SOURCE_URL || 'https://note.com/iandi_kominka';
const ARTICLE_LIMIT = Number.parseInt(process.env.NOTE_ARTICLE_LIMIT || '6', 10) || 6;
const REQUEST_TIMEOUT_MS = 20000;
const MAX_ATTEMPTS = 3;

const decodeEntities = (input) => {
  if (!input) return '';
  let text = String(input);
  text = text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    const code = Number.parseInt(hex, 16);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
  text = text.replace(/&#(\d+);/g, (match, dec) => {
    const code = Number(dec);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
};

const stripTags = (html) => {
  if (!html) return '';
  return decodeEntities(
    decodeEntities(html)
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/p>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
};

const toAbsoluteUrl = (url) => {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return null;
};

const readTag = (block, tag) => {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const matched = block.match(pattern);
  return matched ? decodeEntities(matched[1]).trim() : '';
};

const readAttributeUrl = (block, tag) => {
  const pattern = new RegExp(`<${tag}\\b[^>]*\\burl\\s*=\\s*["']([^"']+)["']`, 'i');
  const matched = block.match(pattern);
  return matched ? decodeEntities(matched[1]) : '';
};

const pickImage = (block) => {
  const candidates = [
    readAttributeUrl(block, 'media:thumbnail'),
    readAttributeUrl(block, 'media:content'),
    readAttributeUrl(block, 'enclosure'),
    readAttributeUrl(block, 'note:thumbnail'),
  ];
  for (const candidate of candidates) {
    const absolute = toAbsoluteUrl(candidate);
    if (absolute) return absolute;
  }
  // 記事本文の先頭画像を使う
  const description = decodeEntities(readTag(block, 'description') || readTag(block, 'content:encoded'));
  const img = description.match(/<img[^>]+src\s*=\s*["']([^"']+)["']/i);
  if (img) {
    const absolute = toAbsoluteUrl(img[1]);
    if (absolute) return absolute;
  }
  return null;
};

const formatJstDate = (date) => {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (type) => (parts.find((part) => part.type === type) || {}).value || '';
  return `${get('year')}.${get('month')}.${get('day')}`;
};

const parseArticles = (xml) => {
  const items = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) || [];
  const seen = new Set();
  const articles = [];

  for (const item of items) {
    const title = stripTags(readTag(item, 'title'));
    const link = toAbsoluteUrl(readTag(item, 'link')) || toAbsoluteUrl(readTag(item, 'guid'));
    if (!title || !link || seen.has(link)) continue;
    seen.add(link);

    const rawDate = readTag(item, 'pubDate') || readTag(item, 'dc:date');
    const parsed = rawDate ? new Date(rawDate) : new Date();
    const published = Number.isNaN(parsed.getTime()) ? new Date() : parsed;

    const excerptSource = stripTags(readTag(item, 'description') || readTag(item, 'content:encoded'));
    const excerpt = excerptSource.length > 110 ? `${excerptSource.slice(0, 110)}…` : excerptSource;

    articles.push({
      title,
      url: link,
      date: formatJstDate(published),
      isoDate: published.toISOString(),
      image: pickImage(item),
      excerpt,
    });
  }

  articles.sort((a, b) => (a.isoDate < b.isoDate ? 1 : a.isoDate > b.isoDate ? -1 : 0));
  return articles.slice(0, ARTICLE_LIMIT);
};

const fetchWithRetry = async (url) => {
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Ayanoi-Site-RSS-Bot/1.0 (+GitHub Actions)',
          Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      console.warn(`[note-rss] 取得に失敗しました（${attempt}/${MAX_ATTEMPTS}）: ${error.message}`);
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((done) => setTimeout(done, attempt * 3000));
      }
    }
  }
  throw lastError || new Error('RSSの取得に失敗しました');
};

const buildFileContent = (articles, fetchedAt) => {
  const lines = [
    '// このファイルは scripts/fetch-note-rss.mjs が GitHub Actions で自動生成します。',
    '// 手動で編集しても、次回の自動取得（1時間ごと）で上書きされます。',
    `// 取得元: ${SOURCE_URL}`,
    '',
    "import type { NoteArticle } from '@/data/noteArticleTypes';",
    '',
    `export const noteFetchedAt = ${JSON.stringify(fetchedAt)};`,
    `export const noteSourceUrl = ${JSON.stringify(SOURCE_URL)};`,
    '',
    `export const noteArticles: NoteArticle[] = ${JSON.stringify(articles, null, 2)};`,
    '',
  ];
  return lines.join('\n');
};

/** 既存ファイルに書き出されている記事配列を読み取る（差分判定用） */
const readExistingArticles = async () => {
  try {
    const content = await readFile(OUTPUT_FILE, 'utf8');
    const marker = content.indexOf('export const noteArticles');
    if (marker === -1) return null;
    const start = content.indexOf('[', marker);
    const end = content.lastIndexOf(']');
    if (start === -1 || end === -1 || end <= start) return null;
    const parsed = JSON.parse(content.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const keepExistingFile = async (reason) => {
  try {
    const existing = await readFile(OUTPUT_FILE, 'utf8');
    console.warn(`[note-rss] ${reason} 前回取得したデータをそのまま使います。`);
    if (!existing.trim()) throw new Error('既存データが空です');
  } catch {
    console.warn('[note-rss] 既存データが無いため、空の状態で書き出します。');
    await mkdir(dirname(OUTPUT_FILE), { recursive: true });
    await writeFile(OUTPUT_FILE, buildFileContent([], new Date().toISOString()), 'utf8');
  }
};

const main = async () => {
  const fetchedAt = new Date().toISOString();
  let xml = '';
  try {
    console.log(`[note-rss] 取得開始: ${RSS_URL}`);
    xml = await fetchWithRetry(RSS_URL);
  } catch (error) {
    await keepExistingFile(`RSSを取得できませんでした（${error.message}）。`);
    return;
  }

  const articles = parseArticles(xml);
  console.log(`[note-rss] 記事 ${articles.length} 件を取得しました。`);

  const existing = await readExistingArticles();
  if (existing && JSON.stringify(existing) === JSON.stringify(articles)) {
    console.log('[note-rss] 前回と同じ内容のため、ファイルは更新しません。');
    return;
  }

  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, buildFileContent(articles, fetchedAt), 'utf8');
  console.log('[note-rss] src/data/noteArticles.ts を更新しました。');
};

main().catch(async (error) => {
  console.error(`[note-rss] 予期しないエラー: ${error.message}`);
  await keepExistingFile('処理中にエラーが発生しました。');
  process.exitCode = 0;
});