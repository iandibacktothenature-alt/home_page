#!/usr/bin/env node
/**
 * Instagram Graph API（Instagram API with Instagram Login）から告知アカウントの
 * 最新投稿（通常投稿・リール）を取得し、サイト表示用データ（src/data/instagramPosts.ts）を生成します。
 *
 * 実行: INSTAGRAM_ACCESS_TOKEN=xxxx node scripts/fetch-instagram.mjs
 * GitHub Actions では Secrets の INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_USER_ID を利用します。
 *
 * 取得に失敗した場合は、ファイルを書き換えず（＝前回取得分をそのまま残し）正常終了します。
 * これにより片方が失敗しても、もう片方の更新を止めません。
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');
const OUTPUT_FILE = resolve(PROJECT_ROOT, 'src/data/instagramPosts.ts');

const ACCESS_TOKEN = (process.env.INSTAGRAM_ACCESS_TOKEN || '').trim();
const USER_ID = (process.env.INSTAGRAM_USER_ID || '').trim() || 'me';
const HANDLE = (process.env.INSTAGRAM_HANDLE || 'iandi_inzai_info').trim().replace(/^@/, '');
const PROFILE_URL = process.env.INSTAGRAM_PROFILE_URL || `https://www.instagram.com/${HANDLE}/`;
const GRAPH_VERSION = (process.env.INSTAGRAM_GRAPH_VERSION || '').trim();
const POST_LIMIT = Math.min(Math.max(Number.parseInt(process.env.INSTAGRAM_POST_LIMIT || '6', 10) || 6, 1), 20);
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
const REQUEST_TIMEOUT_MS = 20000;
const MAX_ATTEMPTS = 3;

const API_HOST = 'https://graph.instagram.com';
const versionPath = GRAPH_VERSION ? `/${GRAPH_VERSION.replace(/^\/+|\/+$/g, '')}` : '';

const decodeEntities = (input) => {
  if (!input) return '';
  return String(input)
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      const code = Number.parseInt(hex, 16);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    })
    .replace(/&#(\d+);/g, (match, dec) => {
      const code = Number(dec);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    })
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

/** キャプションの冒頭だけを取り出す（ハッシュタグとURLは落とす） */
const buildExcerpt = (rawCaption) => {
  const caption = decodeEntities(rawCaption || '').replace(/\r\n/g, '\n').trim();
  if (!caption) return '';
  const cleaned = caption
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/#[^\s#]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const base = cleaned || caption.replace(/\s+/g, ' ').trim();
  return base.length > 90 ? `${base.slice(0, 90)}…` : base;
};

const pickImage = (media) => {
  const candidates =
    media.media_type === 'VIDEO'
      ? [media.thumbnail_url, media.media_url]
      : [media.media_url, media.thumbnail_url];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && /^https?:\/\//.test(candidate.trim())) {
      return candidate.trim();
    }
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

const normalizePosts = (mediaList) => {
  const seen = new Set();
  const posts = [];

  for (const media of mediaList) {
    if (!media || !media.id) continue;
    const permalink = typeof media.permalink === 'string' ? media.permalink.trim() : '';
    if (!/^https?:\/\//.test(permalink) || seen.has(permalink)) continue;
    seen.add(permalink);

    const parsed = media.timestamp ? new Date(media.timestamp) : new Date();
    const published = Number.isNaN(parsed.getTime()) ? new Date() : parsed;

    posts.push({
      id: String(media.id),
      caption: buildExcerpt(media.caption),
      date: formatJstDate(published),
      isoDate: published.toISOString(),
      image: pickImage(media),
      permalink,
      mediaType: typeof media.media_type === 'string' ? media.media_type : 'IMAGE',
    });
  }

  posts.sort((a, b) => (a.isoDate < b.isoDate ? 1 : a.isoDate > b.isoDate ? -1 : 0));
  return posts.slice(0, POST_LIMIT);
};

const fetchWithRetry = async (url) => {
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const text = await response.text();
      let payload = null;
      try {
        payload = JSON.parse(text);
      } catch {
        payload = null;
      }
      if (!response.ok) {
        const message =
          (payload && payload.error && (payload.error.message || payload.error.type)) ||
          `HTTP ${response.status} ${response.statusText}`;
        throw new Error(String(message));
      }
      if (!payload || !Array.isArray(payload.data)) {
        throw new Error('想定外のレスポンス形式です');
      }
      return payload.data;
    } catch (error) {
      lastError = error;
      console.warn(`[instagram] 取得に失敗しました（${attempt}/${MAX_ATTEMPTS}）: ${error.message}`);
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((done) => setTimeout(done, attempt * 3000));
      }
    }
  }
  throw lastError || new Error('Instagramの取得に失敗しました');
};

/** 既存ファイルに書き出されている投稿配列を読み取る（差分判定用） */
const readExistingPosts = async () => {
  try {
    const content = await readFile(OUTPUT_FILE, 'utf8');
    const marker = content.indexOf('export const instagramPosts');
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

const buildFileContent = (posts, fetchedAt) => {
  const lines = [
    '// このファイルは scripts/fetch-instagram.mjs が GitHub Actions で自動生成します。',
    '// 手動で編集しても、次回の自動取得（1時間ごと）で上書きされます。',
    `// 取得元: ${PROFILE_URL}`,
    '',
    "import type { InstagramPost } from '@/data/instagramTypes';",
    '',
    `export const instagramFetchedAt = ${JSON.stringify(fetchedAt)};`,
    `export const instagramHandle = ${JSON.stringify(HANDLE)};`,
    `export const instagramProfileUrl = ${JSON.stringify(PROFILE_URL)};`,
    '',
    `export const instagramPosts: InstagramPost[] = ${JSON.stringify(posts, null, 2)};`,
    '',
  ];
  return lines.join('\n');
};

const skip = (reason, code = 0) => {
  console.warn(`[instagram] ${reason} 前回取得したデータをそのまま使います。`);
  process.exitCode = code;
};

const main = async () => {
  if (!ACCESS_TOKEN) {
    skip('INSTAGRAM_ACCESS_TOKEN が未設定のため取得をスキップしました。');
    return;
  }

  const params = new URLSearchParams({
    fields: FIELDS,
    limit: String(Math.max(POST_LIMIT * 3, 12)),
    access_token: ACCESS_TOKEN,
  });
  const url = `${API_HOST}${versionPath}/${encodeURIComponent(USER_ID)}/media?${params.toString()}`;

  console.log(`[instagram] 取得開始: ${HANDLE}（${USER_ID}）`);
  const mediaList = await fetchWithRetry(url);
  const posts = normalizePosts(mediaList);
  console.log(`[instagram] 投稿 ${posts.length} 件を取得しました。`);

  const existing = await readExistingPosts();
  if (existing && JSON.stringify(existing) === JSON.stringify(posts)) {
    console.log('[instagram] 前回と同じ内容のため、ファイルは更新しません。');
    return;
  }

  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, buildFileContent(posts, new Date().toISOString()), 'utf8');
  console.log('[instagram] src/data/instagramPosts.ts を更新しました。');
};

main().catch((error) => {
  // 失敗してもワークフローを止めない（もう片方の取得を続けるため）
  skip(`取得できませんでした（${error.message}）。`);
});