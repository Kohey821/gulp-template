# 自分用 gulp.js テンプレート

## 初回インストール

[Node.js](https://nodejs.org/ja/) (推奨版)をインストール

このディレクトリを [Git Bash](https://gitforwindows.org/) 等で開いて

``` sh
npm install --global gulp-cli \
&& npm install -g sass \
&& npm install -g browser-sync
```

で必要なグローバル npm パッケージをイントールしたのち

``` sh
npm install
```

でこのディレクトリで必要な npm パッケージをインストール

## gulp-config.js

browserSync:
  [公式](https://browsersync.io/docs/options) と同様

watch.src:
  変更時にブラウザをリロードするファイル郡
  [src()](https://gulpjs.com/docs/en/api/src) の globs パラメーター同様

watch.sass.src:
  sass ファイル群
  [src()](https://gulpjs.com/docs/en/api/src) の globs パラメーター同様

watch.sass.dest:
  sass コンパイル先
  [dest()](https://gulpjs.com/docs/en/api/dest) の directory パラメーター同様

## 稼働

このディレクトリを [Git Bash](https://gitforwindows.org/) 等で開いて

``` sh
gulp
```

node-sass 系のエラーが出る場合は

``` sh
npm rebuild node-sass
```

で node-sass をリビルド