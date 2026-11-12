#!/usr/bin/env node
/**
 * Instagram（Instagram API with Instagram Login）の長期アクセストークンを更新します。
 * 取得したトークンは 60 日で失効するため、45 日ほどを目安に更新してください。
 *
 * 使い方（手元のターミナルで実行）:
 *   INSTAGRAM_ACCESS_TOKEN=現在のトークン node scripts/refresh-instagram-token.mjs
 *
 * 表示された「新しいアクセストークン」を、GitHub の
 * Settings → Secrets and variables → Actions → INSTAGRAM_ACCESS_TOKEN に上書きしてください。
 */

const token = (process.env.INSTAGRAM_ACCESS_TOKEN || '').trim();

if (!token) {
  console.error('[instagram-token] INSTAGRAM_ACCESS_TOKEN を指定して実行してください。');
  process.exit(1);
}

const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`;

const response = await fetch(url, { headers: { Accept: 'application/json' } });
const text = await response.text();

let payload = null;
try {
  payload = JSON.parse(text);
} catch {
  payload = null;
}

if (!response.ok || !payload || !payload.access_token) {
  const message =
    (payload && payload.error && (payload.error.message || payload.error.type)) ||
    `HTTP ${response.status} ${response.statusText}`;
  console.error(`[instagram-token] 更新に失敗しました: ${message}`);
  console.error('[instagram-token] トークンがすでに失効している場合は、Metaのアプリ画面から再発行してください。');
  process.exit(1);
}

const days = Math.round((Number(payload.expires_in) || 5184000) / 86400);
console.log(`[instagram-token] 更新に成功しました（有効期限: 約 ${days} 日）`);
console.log('');
console.log('新しいアクセストークン:');
console.log(payload.access_token);
console.log('');
console.log('GitHub の Secrets（INSTAGRAM_ACCESS_TOKEN）をこの値で上書きしてください。');