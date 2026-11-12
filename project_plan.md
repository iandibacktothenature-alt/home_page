# I&I古民家ベース（アヤナイ）公式サイト

## 1. プロジェクト概要
千葉県印西市の古民家と畑を拠点にした「アヤナイ」の公式サイト（日本語）。自然農・食・季節の行事・子どもの体験・家族撮影・事業者交流を通じた「循環する農と暮らし」「もう一つの田舎」を伝える。
最優先：初めての人がスマホから農園見学・体験、季節のイベント、家族撮影会へ参加できること。事業者は交流会へ案内。

## 2. ページ構成
- `/` ホーム（メインビジュアル、お知らせ※原稿まで非表示、想い、できること、施設、アクセス概要）
- `/farm` 農園（区画・料金・月別作業ガイド・申込みの流れ）
- `/schedule` アヤナイの予定帖（TimeTree埋め込み）
- `/photo` 季節の家族撮影会
- `/business` 事業者交流会
- `/about` アヤナイについて（運営者・アクセス・FAQ）
- `/contact` お問い合わせ・ご予約（目的別の入口）
- 日記帖：外部 note（https://note.com/iandi_kominka）

## 3. コア機能
- [x] 共通ヘッダー／スマホメニュー／フッター
- [x] トップページ
- [x] 予定帖（TimeTree埋め込み＋外部リンク）
- [x] 農園ページ・月別ガイド（ホバー／キーボード／タップ）
- [ ] 撮影会・事業者交流会・アヤナイについて・お問い合わせ各ページ
- [ ] FAQ（回答確定分のみ）

## 4. データ運用
データベースは使用しない。運営者が更新する内容は `src/mocks/site.ts` に集約：
- 受付URL（未設定＝null の場合は「受付先準備中」表示、予定帖へ誘導）
- お知らせ・活動記録・利用者の声・スタッフ（空配列なら公開側で非表示）
- 日程の更新元：TimeTree／活動記録：note

### 4-1. トップページの編集箇所（`src/mocks/site.ts` にまとめています）
| 欄 | データ | 表示ルール |
| --- | --- | --- |
| お知らせ・最新情報 | `src/data/instagramPosts.ts`（自動生成） | 告知用Instagram @iandi_inzai_info の最新3件。画像／リールのサムネイル・キャプション冒頭・投稿日。初回取得前はアカウントへのリンクを表示 |
| 活動紹介 | `src/data/noteArticles.ts`（自動生成） | note の新着記事3件（見出し画像・タイトル・投稿日）。0件時はnoteへのリンクを表示 |
| 参加者の声 | `voices` | 掲載許可を得た感想のみ。`activity`（参加した活動名）＋`text`、`name`・`photo` は任意。`[]` で非表示 |
| 予定帖・日記帖・公式LINE・Instagram | `externalLinks` | 既存のTimeTree／noteのURLを維持 |

- `sample: true` はレイアウト確認用のサンプル原稿。実際の原稿に差し替えるときに削除する（「サンプル」表示が消える）。
- 写真は掲載許可を得たものだけを `image`／`photo` に入れる。未設定は `null`。

## 5. 外部連携
- TimeTree 公開カレンダー（埋め込み）
- note（日記帖）：https://note.com/iandi_kominka ／ RSS: https://note.com/iandi_kominka/rss
- Instagram：https://www.instagram.com/iandi_backtothe_nature/?hl=ja
- 公式LINE：https://line.me/R/ti/p/@035qqrmm

### 5-1. トップの新着2欄を投稿するだけで自動更新
- Instagram（お知らせ・最新情報）
  - 取得処理：`scripts/fetch-instagram.mjs` ／ Instagram API with Instagram Login（`graph.instagram.com`）
  - 出力：`src/data/instagramPosts.ts`（投稿 ID・キャプション冒頭・投稿日・画像／リールサムネイル・投稿URL）
  - 認証：GitHub Secrets の `INSTAGRAM_ACCESS_TOKEN`（任意で `INSTAGRAM_USER_ID`）。サイト／リポジトリには保存しない
  - 表示：`Notices.tsx`（画像・キャプション冒頭・投稿日・リールバッジ、タップで該当投稿へ）
- note（活動紹介）
  - 取得処理：`scripts/fetch-note-rss.mjs`（RSS: https://note.com/iandi_kominka/rss）
  - 出力：`src/data/noteArticles.ts`（タイトル・URL・投稿日・見出し画像・抜粋、最大6件）
  - 表示：`Records.tsx`（見出し画像・タイトル・投稿日を新着順に3件）
- 自動実行：`.github/workflows/update-feeds.yml`（1時間ごと＋手動実行）。2つの取得は独立ステップで、片方が失敗しても前回取得分を保持し、もう片方は更新を続ける
- 変化があるときだけコミット → `deploy-pages.yml` が自動で再ビルド・公開
- 初回取得前／0件のときは、各アカウントへのリンクを表示

## 6. 公開（GitHub Pages）
- 公開ワークフロー：`.github/workflows/deploy-pages.yml`（main への push／新着情報の取得完了後／手動実行）
- ビルド成果物は `out`。`BASE_PATH` はリポジトリ名から自動判定（`*.github.io` は `/`、それ以外は `/<repo>/`）
- SPAの直リンク対策として `out/404.html` と `.nojekyll` を生成
- 初回のみ：GitHub の Settings → Pages → Source を「GitHub Actions」に設定
- 手順メモ：`docs/github-pages.md`

## 7. 開発フェーズ
### Phase 1：骨格とコア導線（完了）
- 共通レイアウト、トップ、予定帖、農園
### Phase 2：撮影会・事業者交流会ページ
### Phase 3：アヤナイについて（運営者・アクセス・FAQ）・お問い合わせ
### Phase 4：受付URL・素材が揃った項目の公開、スマホ最終確認

## 8. 編集者向け 確認待ちリスト
- お知らせ原稿（募集開始・満席・日程変更・中止の最新情報）
- 参加者の声：掲載許可の取得状況、活動名・お名前・写真の公開可否
- 活動風景・実績：実施時期、短い紹介文、掲載許可済み写真、関連記事URL
- 詳細な番地・地図・入口・駐車台数・集合場所・送迎対応（アクセス欄への追記可否）
- 各企画の専用申込み先（公式LINE以外を使う企画があるか）
- 農園：区画の空き、受付URL、税込表示、契約名義、規約、設備、解約・返却・返金
- アキラ以外のスタッフ情報・写真、実際の活動写真
- FAQ回答、規約・個人情報の取り扱い文書
- キッズファーム／自然學舎の実施条件と公開承認