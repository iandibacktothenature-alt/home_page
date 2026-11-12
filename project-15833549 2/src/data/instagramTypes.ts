export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | string;

export type InstagramPost = {
  /** Instagramの投稿ID */
  id: string;
  /** キャプションの冒頭テキスト（ハッシュタグは除去） */
  caption: string;
  /** 表示用の投稿日（例: 2026.11.12） */
  date: string;
  /** 並び替え用の投稿日時（ISO 8601） */
  isoDate: string;
  /** 画像、またはリール・動画のサムネイル。取得できない場合は null */
  image: string | null;
  /** 該当のInstagram投稿URL */
  permalink: string;
  /** 投稿の種類（IMAGE / VIDEO / CAROUSEL_ALBUM） */
  mediaType: InstagramMediaType;
};