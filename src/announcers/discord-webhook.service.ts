import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import fetch from 'node-fetch';
const { DISCORD_WEBHOOK_ID, OWNCAST_SERVER_URL } = process.env;

@Injectable()
export class DiscordWebhookService implements Announcer {
    async isSupported(webhook: OwncastWebhook): Promise<boolean> {
        return !!DISCORD_WEBHOOK_ID;
    }
    async announce(webhook: OwncastWebhook): Promise<void> {
        const url = `https://discord.com/api/webhooks/${DISCORD_WEBHOOK_ID}`;
        const title = webhook.eventData.streamTitle;
        const message = `@mattdsteele now streaming: ${title} ${OWNCAST_SERVER_URL}`;
        await fetch(url, { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: message }), method: 'POST' });
    }
}
