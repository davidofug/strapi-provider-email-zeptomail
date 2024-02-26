# Strapi provider email zeptomail

Send emails from Strapi through zeptomail.

## Introduction

Zeptomail is a popular email service, which is among the best at delivering transactional mail messages.

If you want your Strapi users to reset passwords, receive email confirmation etc, look into Zeptomail.

## Requirements

1. Working Strapi v4 project
2. A valid Zeptomail account
3. Zeptomail url and Zeptomail token
4. Configure email plugin in Strapi

## The Steps to follow

### 1. Zeptomail account

Get a free acoount on zeptomail.com and send 100 mails per day for FREE. Verify your account and purchase credit to send more.

### 2. Installation

Use NPM

```
npm i strapi-provider-email-zeptomail --save
```

Use Yarn

```
yarn add strapi-provider-email-zeptomail
```

### 3. Configuration

**_Zeptomail credentials_**

Obtain the url and token from zeptomail account

**_Set environment variables_**

Add `ZEPTOMAIL_URL` and `ZEPTOMAIL_TOKEN` keys together with correspondig values to the .env file of your Strapi project.

**_Example on environment variables_**

```
...
ZEPTOMAIL_URL=value_from_your_zeptomail_account
ZEPTOMAIL_TOKEN=value_from_your_zeptomail_account
...
```

### 4. Enable email plugin

Edit `./config/plugins.js` or create the `plugins.js` file in ./`config` directory if it doesn't exist.

The snippet below demonstrates how to acheive enabling the email plugin in Strapi. Replace me@example.com with your valid email address. For example, no-reply@domain.com

_Note:_ If you don't specify the defaultFrom, it will default to no-reply@strapi.io

```
email: {
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
}
```

## How to support

1. Send an issue
2. Contribute code and documentation
3. Buy me coffee => https://cutt.ly/bwEy0ejA
