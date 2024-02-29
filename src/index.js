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

				const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;

				// Extract the email address using the regex
				const extractedEmail = from?.match(emailRegex)[0];

				const senderNameRegex = /^(.*?)\s*</;
				const senderNameMatch = from?.match(senderNameRegex);
				const senderName = senderNameMatch ? senderNameMatch[1] : null;
				const messageDetails = {
					from: {
						address: extractedEmail || settings.defaultFrom,
						name: senderName || settings.sender_name,
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
					console.error(JSON.stringify(error, null, 2));
				}
			},
		};
	},
};
