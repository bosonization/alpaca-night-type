# 夜の16タイプ診断｜アルパカ夜人格 MVP

アルパカビジュアルを組み込んだ静的サイト版です。npm不要、ビルド不要で最短公開できます。

## 中身

- `index.html`
- `style.css`
- `app.js`
- `alpaca-promo.png`

## できること

- MBTI/16タイプ登録ゲート
- 未登録ユーザー向け12問仮判定
- ひとり診断
- ふたり相性診断
- 合言葉式の深夜モード
- アルパカビジュアル入りトップ/結果UI
- SNS共有リンク

## 無料公開の最短手順

### 1. GitHubにアップロード

1. GitHubで新規リポジトリを作る
2. このフォルダ内の4ファイルをアップロード
3. Commit changes

### 2. Vercelで公開

1. VercelにGitHubログイン
2. Add New Project
3. GitHubのリポジトリをImport
4. Framework Presetは `Other` のままでOK
5. Deploy

数十秒で `https://xxxxx.vercel.app` が発行されます。

## 合言葉の変更

`app.js` の先頭を変更します。

```js
const MONTHLY_PASSWORD='午前2時';
```

## ビジュアル差し替え

`alpaca-promo.png` を同じ名前で置き換えるだけです。
