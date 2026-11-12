> 公開作業は、まず `github-upload-guide.md` の修正版手順に従ってください。この文書には旧Instagram API構成の記録も含まれます。

# 新着情報の自動更新と GitHub Pages 公開の手順

> **現在の構成（重要）**
> トップページの「お知らせ・最新情報」は **SnapWidgetの埋め込み**に変更しました。
> InstagramはSnapWidget側が表示するため、**`INSTAGRAM_ACCESS_TOKEN` の登録は不要**です（下記1-2・4は過去の構成の記録です）。
> 自動取得が必要なのは **note（活動紹介）のみ**で、こちらはトークン不要・設定なしで動きます。
> Instagramウィジェットの表示件数はSnapWidgetの管理画面で変更します（Layout: Grid / Photos per row: 3 / Rows: 1）。

トップページの2つの欄は、投稿するだけで自動更新されます。

| 欄 | 取得元 | 表示 |
| --- | --- | --- |
| お知らせ・最新情報 | Instagram [@iandi_inzai_info](https://www.instagram.com/iandi_inzai_info/) の通常投稿・リール | 新しい順に3件（画像またはリールのサムネイル・キャプション冒頭・投稿日） |
| 活動紹介 | [アヤナイのnote](https://note.com/iandi_kominka) の公式RSS | 新しい順に3件（見出し画像・記事タイトル・投稿日） |

しくみは3つの部品です。

| 役割 | ファイル | 動き |
| --- | --- | --- |
| Instagram取得 | `scripts/fetch-instagram.mjs` | Instagram API with Instagram Login（`graph.instagram.com`）で最新投稿を取得し `src/data/instagramPosts.ts` を書き換える |
| note取得 | `scripts/fetch-note-rss.mjs` | 公式RSSを読み、`src/data/noteArticles.ts` を書き換える |
| 定期実行 | `.github/workflows/update-feeds.yml` | 1時間ごと＋手動実行。2つの取得は独立して動き、片方が失敗しても前回取得分を残してもう片方は更新。変化があったときだけ自動コミット |
| 公開 | `.github/workflows/deploy-pages.yml` | push時・取得ワークフロー完了後・手動実行時にビルドして GitHub Pages へ公開 |

- カードのリンク先は、Instagramは該当投稿、noteは該当記事です。
- 初回取得前や投稿が0件のときは、各アカウントへのリンクが表示されます。
- Instagramのアクセストークンは **GitHubのSecretsにだけ** 保存します。サイトのコードやリポジトリには含まれません。

---

## 1. 最初に一度だけ行う設定

### 1-1. GitHub（公開の設定）
1. このサイトのコードを GitHub のリポジトリに置きます（例：`ayanoi-site`）。
2. **Settings → Pages → Build and deployment → Source** を **「GitHub Actions」** に変更します。
3. **Settings → Actions → General → Workflow permissions** を **「Read and write permissions」** に変更します（自動取得したデータをコミットするため）。
4. **Settings → Secrets and variables → Actions → New repository secret** で、次の2つを登録します。

| Secret 名 | 必須 | 内容 |
| --- | --- | --- |
| `INSTAGRAM_ACCESS_TOKEN` | 必須 | Metaで発行した長期アクセストークン（`IGAA...` で始まる文字列） |
| `INSTAGRAM_USER_ID` | 任意 | 取得したいInstagramアカウントのID。未登録なら `me`（＝トークンの持ち主）を使います |

> Secret の値は一度登録すると画面に表示されません。控えは安全な場所に保管してください。
> コード（`src` や `scripts`）には絶対に書かないでください。

### 1-2. Instagram（Meta）側の初回設定
1. **@iandi_inzai_info をプロアカウントにする**
   Instagramアプリ → 設定 → アカウントの種類 → 「プロアカウントに切り替える」→ ビジネス または クリエイターを選択（無料）。
2. **Meta for Developers でアプリを作る**
   [developers.facebook.com/apps](https://developers.facebook.com/apps) にログイン → 「アプリを作成」→ ユースケースで **Instagram** を選び、アプリ名を入力して作成します。
3. **「Instagram」製品を開き、「API setup with Instagram login」を選ぶ**
   アプリ管理画面の左メニュー「Instagram」→「API setup with Instagram login」を開きます。
4. **アカウントを追加して権限を付ける**
   「Generate access tokens」の欄で **@iandi_inzai_info を追加**（そのアカウントでログインして許可）し、権限 **`instagram_business_basic`** にチェックを入れます。
5. **アクセストークンを発行してコピー**
   「Generate token」を押すと長期アクセストークン（有効期限 約60日）が表示されます。これを GitHub の `INSTAGRAM_ACCESS_TOKEN` に登録します。
6. **アカウントIDを確認したい場合（任意）**
   ブラウザで次のURLを開くと `id` / `username` が確認できます（`<TOKEN>` を差し替え）。
   `https://graph.instagram.com/me?fields=user_id,username&access_token=<TOKEN>`
   表示された数値を `INSTAGRAM_USER_ID` に登録しても構いません（未登録でも動きます）。

補足：
- 自分のアカウントの投稿を読むだけなら、アプリは「開発モード」のままで動作します（アプリ審査は不要）。
- 取得するのは**投稿の写真・キャプション・投稿日・投稿URL**のみで、DMやフォロワー情報には触れません。
- アプリの「アプリロール（テスター）」に @iandi_inzai_info が入っていることを確認してください。

---

## 2. 手動で更新する（いつでも実行できます）
1. GitHub の **Actions → 「新着情報を自動取得」→ Run workflow** を押します（ブランチは `main`）。
2. 数十秒で「noteの新着記事を取得」「Instagramの新着投稿を取得」が実行され、変更があれば自動でコミットされます。
3. 続けて **「GitHub Pagesへ公開」** が自動で走ります（手動で公開したいときは、こちらも Run workflow）。

---

## 3. 公開後の動作確認
1. **Actions → 「新着情報を自動取得」** の実行結果を開き、2つの取得ステップに緑のチェックが付いていることを確認します。
2. **リポジトリの `src/data/instagramPosts.ts` と `src/data/noteArticles.ts`** を開き、投稿・記事のデータが入っていることを確認します。
3. **「GitHub Pagesへ公開」** が成功していることを確認し、公開URL（`https://<ユーザー名>.github.io/<リポジトリ名>/`）を開きます。
4. トップページで、
   - 「お知らせ・最新情報」にInstagramの最新3件（画像・キャプション冒頭・投稿日）が並ぶ
   - 「活動紹介」にnoteの最新3件（見出し画像・タイトル・投稿日）が並ぶ
   - カードをタップすると、該当のInstagram投稿／note記事が開く
   を確認します。
5. スマホでも表示を確認します（カードは1列に並びます）。
6. 投稿を1件増やして、次の1時間の実行後に反映されることを確認すると、自動更新の動作確認が完了です。
7. セキュリティ確認：`INSTAGRAM_ACCESS_TOKEN` の値がリポジトリ内に存在しないこと（ワークフロー内の `secrets.` 参照のみ）を確認します。

---

## 4. Instagramのアクセストークンを更新する
長期アクセストークンの有効期限は**約60日**です。**45日を目安**に更新してください（カレンダー登録がおすすめです）。

### 方法A：付属スクリプトを使う（おすすめ）
手元のターミナルで、現在のトークンを指定して実行します。

```
INSTAGRAM_ACCESS_TOKEN=現在のトークン node scripts/refresh-instagram-token.mjs
```

表示された「新しいアクセストークン」を、GitHub の **Settings → Secrets and variables → Actions → `INSTAGRAM_ACCESS_TOKEN` → Update** に上書きします。

### 方法B：ブラウザ／curlで更新する
```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<現在のトークン>
```

- 更新できるのは「発行から24時間以上経過し、まだ失効していない」トークンです。
- 更新すると、そこからさらに約60日有効になります。
- すでに失効している場合は更新できないため、1-2 の手順でトークンを再発行してください。
- トークンを更新したあとは、**Actions → 「新着情報を自動取得」→ Run workflow** で動作を確認してください。

---

## 5. うまくいかないとき

| 症状 | 確認すること |
| --- | --- |
| Instagram欄が「準備中」のまま | `INSTAGRAM_ACCESS_TOKEN` が登録されているか。Actionsのログにトークン関連のエラーが出ていないか |
| ログに `Invalid OAuth access token` / `code 190` | トークンの失効・誤登録。4の手順で更新、または再発行 |
| ログに `permission` / `(#10)` | アカウントがプロアカウントか、`instagram_business_basic` が許可されているか |
| Instagram欄が空のまま | アカウントに投稿が0件、または投稿がすべて非公開の可能性 |
| note欄が「記事はまだありません」 | noteに記事が0件（記事を公開すると次の実行で並びます） |
| 取得は成功するがコミットされない | 前回と同じ内容のときはコミットしません（正常）。Actions権限が「Read and write」かも確認 |
| サイトが更新されない | Settings → Pages の Source が「GitHub Actions」か。「GitHub Pagesへ公開」が成功しているか |
| 画像が表示されない | Instagramの画像URLは時間が経つと無効になることがあります。**Run workflow** で再取得すると復帰します |

---

## 6. 設定を変えたいとき

- **Instagramのアカウントを変える**：`.github/workflows/update-feeds.yml` の `INSTAGRAM_HANDLE`（表示用）と `INSTAGRAM_POST_LIMIT` を変更し、`INSTAGRAM_USER_ID` Secret を新しいアカウントのIDに更新します。
- **noteのアカウントを変える**：`update-feeds.yml` の `NOTE_RSS_URL` と `NOTE_SOURCE_URL` を書き換えます。
- **取得件数を変える**：`update-feeds.yml` の `INSTAGRAM_POST_LIMIT` / `NOTE_ARTICLE_LIMIT` を変更します（表示は各3件まで、データは多めに保持）。
- **実行頻度を変える**：`update-feeds.yml` の `cron` は UTC 指定です（1時間ごと = `0 * * * *`、日本時間6:00のみ = `0 21 * * *`）。
- **独自ドメインを使う**：`deploy-pages.yml` の公開パス判定をやめて `BASE_PATH` を `/` に固定します。