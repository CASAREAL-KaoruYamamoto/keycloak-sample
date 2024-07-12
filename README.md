# Keycloakによる認証・認可のサンプル

## はじめに

本サンプルは、Keycloakによる認証・認可の一連の流れを確認するためのものです。

実運用を想定していないため、最小限の設定・実装しかしていません。
学習目的でのみご利用ください。

なお、本サンプルの利用にあたり問題が発生した場合については一切の責任を負いません。
あくまでも自己責任でご利用ください。

## 実行環境について

実行には以下のソフトウェアが必要です。

- WindowsまたはmacOS（macOS Sonoma 14.5で動作確認済み）
- Webブラウザー（Google Chrome 126で動作確認済み）
- Docker Desktop（バージョン4.32で動作確認済み）

## システム構成について

本サンプルは以下の3つのアプリケーション／サービスから構成されています。
また、それぞれに示すURLおよびアカウントで利用できます。

- Keycloak
    - OpenIDプロバイダー
    - URL： http://host.docker.internal:8080
    - アカウント（管理者）
        - ユーザー名： admin
        - パスワード： P@ssw0rd
- SPA
    - Vue.jsで記述されたSingle Page Application（Webブラウザー内で実行されるJavaScriptアプリケーション）
    - URL： http://host.docker.internal
    - アカウント1（参照・更新権限を持っているユーザー）
        - ユーザー名： worker1
        - パスワード： P@ssw0rd
    - アカウント2（参照・更新権限を持っているユーザー）
        - ユーザー名： worker2
        - パスワード： P@ssw0rd
    - アカウント3（参照権限しかないユーザー）
        - ユーザー名： manager1
        - パスワード： P@ssw0rd
- Web API
    - Spring Bootで記述されたRESTful Webサービス
    - URL： http://host.docker.internal:8081
    - アカウント
        - なし（JWT Bearerトークンにてアクセス認可）

## 実行方法

> **警告**
> 本手順ではオペレーティング・システムの重要な設定を変更します。
動作確認後は必ず元の設定に戻してください。

1. クライアントから各種サービスを参照するホスト名を`host.docker.internal`に固定するために以下のファイルを編集します。

    - Windows: `C:\Windows\System32\drivers\etc\hosts`
    - macOS: `/etc/hosts`

    下記のように`127.0.0.1 localhost`の後ろに1つスペースを開けてから`host.docker.internal`と追記してください。

    ```text
    127.0.0.1	localhost host.docker.internal
    ```

2. ターミナル（またはコマンド・プロンプト）を開き、このディレクトリーにカレント・ディレクトリを移動してから以下のコマンドを実行します。

    ```
    docker compose up -d
    ```

3. Webブラウザーを開き以下のURLを入力します。

    - SPAクライアント： http://host.docker.internal
    - Keycloak： http://host.docker.internal:8080

## 終了方法

1. ターミナル（またはコマンド・プロンプト）を開き、このディレクトリーにカレント・ディレクトリを移動してから以下のコマンドを実行します。

    ```
    docker compose down
    ```
