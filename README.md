# gulp.js を使用した sass のコンパイルと css のオートストリーム

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

を実行してこのディレクトリで必要な npm パッケージをインストール

## 稼働

このディレクトリを [Git Bash](https://gitforwindows.org/) 等で開いて

``` sh
gulp
```

node-sass 系のエラーが出る場合は

``` sh
npm rebuild node-sass
```

を実行して node-sass をリビルド