# Paka姉メーカー v16

## 修正内容

- iPhone幅で「Paka姉 裏診断」が2行に割れないよう、タイトルを `heroTitle` + `white-space: nowrap` に変更
- スマホ幅ではタイトルサイズを調整
- OGP画像を新規ファイル `ogp-paka-night-luxury-v2.jpg` に差し替え
- OGP URLに `?v=16` を付与し、LINE等のキャッシュ更新を促進
- `og:title`, `og:description`, `twitter:image` 等を最新の「Paka姉 裏診断｜144パターン＋4軸の相性診断」に更新
- シェア本文に8桁コードを含める仕様は維持

## 注意

LINEのプレビューはキャッシュされる場合があります。今回のように画像ファイル名とクエリを変えることで更新されやすくしていますが、反映に時間がかかる場合があります。


## v17 share URL version

LINEなどSNSのOGPキャッシュ対策として、共有URLを以下に固定しました。

https://alpaca-night-type.vercel.app/?v=16

- og:url / canonical も ?v=16 に変更
- アプリ内の全シェアボタンも ?v=16 を本文URLとして使用
- 8桁コード入り本文は維持
