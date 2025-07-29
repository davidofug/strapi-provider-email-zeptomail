interface Settings {
    defaultFrom: string;
    defaultReplyTp: string;
    replyTo: string;
    sender_name: string;
}

interface SendOptions {
    from?: string;
    to: string;
    cc: string;
    bcc: string;
    replyTo?: string;
    subject: string;
    text: string;
    html: string;
    [key: string]: unknown;
}

interface ProviderOptions {
    url: string;
    apiKey: string;
}

declare const _default: {
    init(providerOptions: ProviderOptions, settings: Settings): {
        send(options: SendOptions): async;
    };
};

export default _default;