export interface Announcer {
    isSupported(webhook: OwncastWebhook): Promise<boolean>;
    announce(webhook: OwncastWebhook): Promise<void>;
}
export const AnnouncerToken = Symbol("Announcer");