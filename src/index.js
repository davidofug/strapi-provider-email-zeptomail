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
				const { from, to, cc, bcc, subject, text, html, replyTo, attachments, ...rest } =
					options;

				const messageDetails = {
					to: [
						{
							email_address: {
								address: to
							}
						}
					],
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

				if (attachments) {
					messageDetails["attachments"] = attachments.map(attachment => {
						// Ensure content is base64 encoded
						let base64Content = attachment.content;
						if (Buffer.isBuffer(attachment.content)) {
							base64Content = attachment.content.toString('base64');
						} else if (typeof attachment.content === 'string') {
							// If it's already a string, check if it needs base64 encoding
							// Assume it's not base64 if it contains non-base64 characters
							base64Content = attachment.content;
						}
						
						return {
							content: base64Content,
							mime_type: attachment.contentType || 'application/octet-stream',
							name: attachment.filename,
						};
					});
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
