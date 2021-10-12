export interface Announcer {
    isSupported(webhook: OwncastWebhook): boolean;
    announce(webhook: OwncastWebhook): Promise<void>;
}
export const AnnouncerToken = Symbol("Announcer");