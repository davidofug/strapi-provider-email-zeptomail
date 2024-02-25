"use strict";

const { SendMailClient } = require("zeptomail");

module.exports = {
  provider: "zeptomail",
  name: "Zeptomail",

  init: function (providerOptions, settings) {
    const mailClient = new SendMailClient({
      url: providerOptions.url,
      token: providerOptions.apiKey,
    });
    return {
      send: async function (options) {
        const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } =
          options;
        const data = {
          from: from || { address: settings.defaultFrom, name: "Insightify" },
          to: [
            {
              email_address: {
                address: to,
              },
            },
          ],
          subject,
          htmlbody: html,
          ...rest,
        };

        try {
          return await mailClient.sendMail(data);
        } catch (error) {
          console.error(error);
        }
      },
    };
  },
};
