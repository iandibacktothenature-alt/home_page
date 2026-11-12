# GitHub Pages公開手順（Mac）

対象: https://github.com/iandibacktothenature-alt/home_page
公開予定URL: https://iandibacktothenature-alt.github.io/home_page/

## 今回確認できた原因
2026年11月12日の確認時、GitHubの一番上には「project-15833549 2」フォルダだけがあり、公開ワークフローが認識される場所にありませんでした。
今回のZIPはフォルダの中身をリポジトリの一番上に配置します。ZIPファイルそのものをアップロードしても公開されません。

## アップロード
1. 修正版ZIPをMacでダウンロードし、ダブルクリックで展開します。
2. GitHub Desktopで対象リポジトリをCloneします（すでにClone済みならその作業フォルダを使います）。
3. 展開先で「command + shift + .」を押し、隠しファイルを表示します。
4. package.json、package-lock.json、src、.githubが並ぶ場所の中身を、Cloneしたhome_pageフォルダの直下へコピーします。外側のprojectフォルダごと入れないでください。既存の.gitフォルダには触れません。
5. GitHub Desktopで変更一覧を確認し、Summaryに「HPの公開設定を修正」と入力してCommit to main → Push originを押します。

## 公開設定
1. 対象リポジトリの Settings → Pages を開きます。
2. Build and deployment の Source を GitHub Actions にします。
3. Actions →「GitHub Pagesへ公開」を開きます。実行がなければRun workflowを押します。
4. 緑のチェックになったら公開予定URLを開きます。画像、スマホメニュー、LINE、Instagram、TimeTreeの表示も確認します。

## 更新
Readdyを編集しただけでは、このGitHub側のサイトは更新されません。新しい書き出しの取り込みが必要です。
noteの更新は同梱の「新着情報を自動取得」ワークフローが担当します。定期実行は遅延・停止する場合があります。
Instagram欄は現在SnapWidgetの埋め込みを使用しています。通常の公開にInstagramのアクセストークン登録は不要です。

## この修正版の変更
- Node.js 24でビルド。package-lock.jsonとnpm ciで依存関係を固定。
- 公開時にもnote記事の取得を実行。
- 各サブページ用のindex.htmlを生成し、直接アクセスにも対応。
- 存在しないvite.svgの参照を削除。
- 過去の履歴を強制上書きする手順を削除。

ローカルで公開用ビルドとTypeScriptチェックを実行済み。GitHubへのアップロードと実際の公開は未実施です。
