# 用語

- shell

  Windows Powershell／[Git Bash](https://gitforwindows.org/)等

# 初回インストール

1. [Node.js](https://nodejs.org/ja/)（推奨版）をインストール

2. どこでもいいので`shell`を起動して

    ``` sh
    npm install -g gulp-cli \
    && npm install -g sass \
    && npm install -g browser-sync
    ```

    で必要なグローバルnpmパッケージをイントール

3. このディレクトリを`shell`で開き

    ``` sh
    npm cache clean --force \
    && npm install
    ```

    でこのディレクトリで必要なnpmパッケージのインストール

# 起動

このディレクトリを`shell`で開き

``` sh
gulp
```

`Enter`

# 停止

`gulp`が起動している`shell`で`Ctrl+c`

# 設定

## gulpfile-config-compile.js
- sass

  sass の設定用配列

  - src

    sassのファイル群
    <br>[src()](https://gulpjs.com/docs/en/api/src)のglobsパラメーター同様

  - dest

    コンパイル後格納先
    <br>[dest()](https://gulpjs.com/docs/en/api/dest)のdirectoryパラメーター同様

- svg

  svgの設定用配列

  - src

    svgのファイル群
    <br>[src()](https://gulpjs.com/docs/en/api/src)のglobsパラメーター同様

  - dest

    コンパイル後格納先
    <br>[dest()](https://gulpjs.com/docs/en/api/dest)のdirectoryパラメーター同様

- js

  jsの設定用配列

  - src

    jsのファイル群
    <br>[src()](https://gulpjs.com/docs/en/api/src)のglobsパラメーター同様

  - dest

    コンパイル後格納先
    <br>[dest()](https://gulpjs.com/docs/en/api/dest)のdirectoryパラメーター同様

  - name

    コンパイル後のファイル名

## gulpfile-config-browser-sync.js
- init

  [公式options](https://browsersync.io/docs/options)と同様

- reload

  ファイル変更時にブラウザをリロードするファイル郡
  <br>[src()](https://gulpjs.com/docs/en/api/src)のglobsパラメーター同様

- stream

  ファイル変更時にブラウザに流し込むCSSファイル郡
  <br>[src()](https://gulpjs.com/docs/en/api/src)のglobsパラメーター同様
