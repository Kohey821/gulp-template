# gulp の設定

Windows 向けに記載されているので適宜読み替えで...

## 用語

* shell:

  Windows Powershell / [Git Bash](https://gitforwindows.org/) 等

## 初回インストール

1. [Node.js](https://nodejs.org/ja/) (推奨版)をインストール

2. `shell` を起動して

  ``` sh
  npm install -g gulp-cli \
  && npm install -g sass \
  && npm install -g browser-sync
  ```

  で必要なグローバル npm パッケージをイントール

3. このディレクトリを `shell` で開き

  ``` sh
  npm cache clean --force \
  && npm install
  ```

  でこのディレクトリで必要な npm パッケージのインストール

4. `gulpfile-config-default.js` をコピーして `gulpfile-config.js` にリネーム

## 起動

このディレクトリを `shell` で開き

``` sh
gulp
```

エンター

ブラウザが開けば起動完了

## 停止

`gulp` が起動している `shell` で `Ctrl + c`

## gulpfile-config.js 項目

* browserSync:

  [公式 options](https://browsersync.io/docs/options) と同様
  <br>このプロパティを削除で無効化

* watch.reload.src:

  browserSync 使用時、ファイル変更時にブラウザをリロードするファイル郡
  <br>[src()](https://gulpjs.com/docs/en/api/src) の globs パラメーター同様

* watch.stream.src:

  browserSync 使用時、ファイル変更時にブラウザに流し込む CSS ファイル郡
  <br>[src()](https://gulpjs.com/docs/en/api/src) の globs パラメーター同様

* watch.compile.sass:

  sass 用オブジェクト
  <br>このプロパティを削除で無効化

* watch.compile.sass.src:

  sass ファイル群
  <br>[src()](https://gulpjs.com/docs/en/api/src) の globs パラメーター同様

* watch.compile.sass.dest:

  sass コンパイル先
  <br>[dest()](https://gulpjs.com/docs/en/api/dest) の directory パラメーター同様

* watch.compile.js:

  js 用オブジェクト
  <br>このプロパティを削除で無効化

* watch.compile.js.src:

  js ファイル群
  <br>[src()](https://gulpjs.com/docs/en/api/src) の globs パラメーター同様

* watch.compile.js.dest:

  js コンパイル先
  <br>[dest()](https://gulpjs.com/docs/en/api/dest) の directory パラメーター同様

* watch.compile.js.name:

  js コンパイル後ファイル名 (default: bundle.js)
