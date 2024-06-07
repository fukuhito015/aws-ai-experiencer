# リポジトリ名: AWSAIExperiencer

## システム名: AWS AI Services Experiencer

### 機能概要

このシステムは、AWS の様々な AI サービスを体験できるアプリケーションです。以下の AWS サービスを活用しています。

1. **Amazon Comprehend**:

   - 自然言語処理（NLP）サービスを使用して、テキストから感情、エンティティ、言語、キーフレーズなどを抽出します。

2. **Amazon Polly**:

   - テキストをリアルな音声に変換するサービスです。入力したテキストを音声合成して、さまざまな声で再生します。

3. **Amazon Rekognition**:

   - 画像や動画を分析するサービスです。オブジェクト、シーン、顔の検出および分析を行います。

4. **Amazon Transcribe**:

   - 音声データをテキストに変換する自動音声認識（ASR）サービスです。音声ファイルをアップロードして、その内容をテキストに変換します。

5. **Amazon Translate**:
   - 自然な言語翻訳を提供するサービスです。テキストを多言語に翻訳します。

### 使用技術

- **TypeScript**: システム全体のプログラミング言語。
- **AWS SDK for JavaScript (v2)**: AWS サービスと連携するために使用。

### インストール方法

1. リポジトリをクローンします。

   ```sh
   git clone git@github.com:fukuhito015/aws-ai-experiencer.git
   cd aws-ai-experiencer
   ```

2. 依存関係をインストールします。

   ```sh
   npm i
   ```

3. 環境変数を設定します

   ```
   cp .env.sample.env .env
   ```

4. 起動します。
   ```sh
   npm run dev
   ```
