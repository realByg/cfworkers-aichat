# 🥡 cfworkers-aichat

> AI Chat bot built on Cloudflare workers, powered by OpenAI

## 📚 Usage

1. install wrangler

    ```bash
    npm install -g wrangler
    wrangler login
    ```

2. clone the repo to your local machine and install the dependencies

    ```bash
    git clone https://github.com/realByg/cfworkers-aichat
    cd cfworkers-aichat
    npm i
    ```

3. edit `wrangler.toml`

    ```toml
    name = "ai" # the prefix of your *.workers.dev domain
    main = "index.js"
    compatibility_date = "2023-02-10"

    workers_dev = true

    [vars]
    API_KEY = "" # (optional) set you api key from openai here
    ORG_ID = ""


    [site]
    bucket = "./site/dist"
    ```

4. deploy the site with wrangler

    ```bash
    wrangler publish
    ```
