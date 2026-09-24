# 日経・QUICK ニュース / test02

日経とQUICK Money Worldの日本語記事を各3件、5分ごとに自動更新するWebアプリ。
Google ニュースの公開RSS検索をサーバー側で取得。配信元ドメインを検証し、重複を除外、公開日時順に表示します。公式の重要度ランキングではありません。記事本文は転載しません。配信の遅延・欠落があり得ます。取得失敗時はエラーを表示します。

## 開発・Vercelへのデプロイ

Node.js 22.x / pnpm 11.25.0。`pnpm install --frozen-lockfile`、`pnpm dev`、`pnpm build`、`pnpm start`。

VercelのFramework PresetはNext.js、Root Directoryはリポジトリのルートです。`vercel.json`でビルドコマンドを`pnpm run build`、出力を`.next`に指定しています。ビルドにはNext.jsを使用し、Sites専用の`.openai/hosting.json`は不要です。APIのサーバー実行が必要なため、GitHub Pages単独では動きません。

既存のVite/Cloudflare補助ファイルは保持していますが、Vercelのビルドでは使用しません。依存関係とロックファイルは維持しています。

Repository: https://github.com/koubai-spariticle/test02
既存のSites版: https://nikkei-quick-test02.koubai780659.chatgpt.site

Next.js本番ビルドとTypeScript検査が成功し、`/api/news`が動的ルートとして出力されることを確認済み。実際のRSS接続は作成環境のネットワーク制限により未検証です。
