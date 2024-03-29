import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import { DiscordWebhookService } from './discord-webhook.service';
import { SlackService } from './slack.service';

@Injectable()
export class CompositeAnnouncer implements Announcer {
  private announcers: Announcer[];
  constructor(discord: DiscordWebhookService, slack: SlackService) {
    this.announcers = [discord, slack];
  }
  async isSupported(_webhook: OwncastWebhook): Promise<boolean> {
    console.log(`checking event: ${JSON.stringify(_webhook.eventData)}`);
    if (this.isZwiftRace(_webhook.eventData)) {
      return true;
    }
    console.log('Not a Zwift stream, ignoring');
    return false;
  }
  private isZwiftRace({streamTitle, name}: StreamStartedData) {
    return streamTitle.toLowerCase().includes('zwift');
  }

  async announce(webhook: OwncastWebhook): Promise<void> {
    await Promise.all(
      this.announcers.map(async (r) => {
        if (await r.isSupported(webhook)) {
          await r.announce(webhook);
        }
      }),
    );
  }
}
