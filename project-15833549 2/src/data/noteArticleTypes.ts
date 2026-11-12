export type NoteArticle = {
  /** 記事タイトル */
  title: string;
  /** noteの記事URL */
  url: string;
  /** 表示用の投稿日（例: 2026.11.12） */
  date: string;
  /** 並び替え用の公開日時（ISO 8601） */
  isoDate: string;
  /** アイキャッチ画像。取得できない場合は null */
  image: string | null;
  /** 記事の冒頭テキスト */
  excerpt: string;
};