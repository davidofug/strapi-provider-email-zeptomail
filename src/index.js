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
				const { from, to, cc, bcc, subject, text, html, ...rest } =
					options;
				const messageDetails = {
					from: {
						address: from || settings.defaultFrom,
						name: settings.sender_name || "",
					},
					to: [
						{
							email_address: {
								address: to,
							},
						},
					],
					subject,
					htmlbody: html,
					textbody: text,
					...rest,
				};

				if (settings.replyTo) {
					messageDetails["reply_to"] = {
						address: settings.replyTo,
						name: settings.sender_name,
					};
				}

				try {
					return await mailClient.sendMail(messageDetails);
				} catch (error) {
					console.error(error);
				}
			},
		};
	},
};
