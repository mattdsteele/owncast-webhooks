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
        const webhooks = DISCORD_WEBHOOK_ID.split(',');
        console.log('Discord hook IDs', webhooks);
        await Promise.all(webhooks.map(id => {
            const url = `https://discord.com/api/webhooks/${id}`;
            const title = webhook.eventData.streamTitle;
            const message = `@mattdsteele now streaming: ${title} ${OWNCAST_SERVER_URL}`;
            return fetch(url, { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: message }), method: 'POST' });
        }));
    }
}
