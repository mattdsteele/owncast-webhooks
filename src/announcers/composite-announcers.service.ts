import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import { DiscordWebhookService } from './discord-webhook.service';
import { MastodonService } from './mastodon.service';
import { SlackService } from './slack.service';

@Injectable()
export class CompositeAnnouncer implements Announcer {
  private announcers: Announcer[];
  constructor(discord: DiscordWebhookService, mastodon: MastodonService, slack: SlackService) {
    this.announcers = [discord, mastodon, slack];
  }
  async isSupported(_webhook: OwncastWebhook): Promise<boolean> {
    if (_webhook.eventData.streamTitle.toLowerCase().includes('zwift')) {
      return true;
    }
    console.log('Not a Zwift stream, ignoring');
    return false;
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
