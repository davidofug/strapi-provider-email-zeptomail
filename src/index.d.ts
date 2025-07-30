interface Settings {
    defaultFrom: string;
    defaultReplyTp: string;
    replyTo: string;
    sender_name: string;
}

interface EmailAddress {
    address: string;
    name: string;
}

interface CcBccItem {
    email_address: EmailAddress;
}

interface SendOptions {
    from?: string;
    to: string;
    cc?: CcBccItem[];
    bcc?: CcBccItem[];
    replyTo?: EmailAddress[];
    subject: string;
    text: string;
    html?: string;
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