# Strapi provider email zeptomail

Send emails from Strapi through zeptomail.

Zeptomail is a popular email service, which is among the best at delivering transactional mail messages.

If you want your Strapi users to reset passwords, receive email confirmation etc, look into Zeptomail.

## Requirements

### 1. Zeptomail account

    You need a valid Zeptomail account. Register for free on zeptomail.com. Get 100/mails per day for FREE. Verify your account and purchase credit to send more.

### 2. Install the provider Strapi

    Using NPM

    ```npm i strapi-provider-email-zeptomail --save```


    Using Yarn

    ```yarn add strapi-provider-email-zeptomail```

### 3. Configure this extension

    Edit ./config/plugins.js or create the plugins.js file in ./config directory if it doesn't exist.

### Zeptomail credentials

    Obtain the url and token from zeptomail account

### Edit environment variables

Add ZEPTOMAIL_URL and ZEPTOMAIL_TOKEN keys together with correspondig values to the .env file of your Strapi project

**_Example: Environment variables_**

    ```
    ...
    ZEPTOMAIL_URL=value_from_your_zeptomail_account
    ZEPTOMAIL_TOKEN=value_from_your_zeptomail_account
    ...
    ```

### Let Strapi know your

    This provider extends the Strapi default email plugin. Use the following syntax.

`email: {
        config: {
            provider: "strapi-provider-email-zeptomail",
            providerOptions: {
                url: env("ZEPTOMAIL_URL"),
                apiKey: env("ZEPTOMAIL_TOKEN"),
            }
        },
        settings: {
            defaultFrom: "me@example.com",
            defaultReplyTo: "me@example.com",
        },
    }`
