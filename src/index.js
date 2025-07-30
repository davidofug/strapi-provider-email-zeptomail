"use strict";

const { SendMailClient } = require("zeptomail");

module.exports = {
	init: function (providerOptions, settings) {
		const mailClient = new SendMailClient({
			url: providerOptions.url,
			token: providerOptions.apiKey,
		});
		return {
			send: async function (options) {
				const { from, to, cc, bcc, subject, text, html, replyTo, ...rest } =
					options;

				const messageDetails = {
					to: to,
					from: from || {
						address: settings.defaultFrom,
						name: settings.sender_name
					},
					subject: subject,
					textbody: text,
					htmlbody: html,
					cc: cc,
					bcc: bcc
				};

				if (replyTo) {
					messageDetails["reply_to"] = replyTo;
				}
				else if (settings.replyTo) {
					messageDetails["reply_to"] = [{
						address: settings.replyTo,
						name: settings.sender_name,
					}];
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
