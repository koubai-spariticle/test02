# 日経・QUICK ニュース / test02

日経とQUICK Money Worldの日本語記事を各3件、5分ごとに自動更新するWebアプリ。
Google ニュースの公開RSS検索をサーバー側で取得。配信元ドメインを検証し、重複を除外、公開日時順に表示します。公式の重要度ランキングではありません。記事本文は転載しません。配信の遅延・欠落があり得ます。取得失敗時はエラーを表示します。

Node.js 22.13以降。pnpm install / pnpm dev / pnpm build。
VinextとCloudflare Workersのサーバー機能を使用するためGitHub Pages単独では動きません。

Repository: https://github.com/koubai-spariticle/test02
Site: https://nikkei-quick-test02.koubai780659.chatgpt.site
型チェック・本番ビルド・RSS処理検証済み。実際のRSS接続は環境のネットワーク制限により未検証。
