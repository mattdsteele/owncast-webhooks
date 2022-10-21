import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import fetch from 'node-fetch';
const { SLACK_WEBHOOK_ID, OWNCAST_SERVER_URL } = process.env;

@Injectable()
export class SlackService implements Announcer {
    async isSupported(webhook: OwncastWebhook): Promise<boolean> {
        return !!SLACK_WEBHOOK_ID;
    }
    async announce(webhook: OwncastWebhook): Promise<void> {
        const url = `https://hooks.slack.com/services/${SLACK_WEBHOOK_ID}`;
        const title = webhook.eventData.streamTitle;
        const message = `@mattdsteele now streaming: ${title} ${OWNCAST_SERVER_URL}`;
        await fetch(url, { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: message }), method: 'POST' });
    }
}
