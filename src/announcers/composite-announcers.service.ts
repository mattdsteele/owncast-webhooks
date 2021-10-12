import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import { DiscordService } from './discord.service';
import { MastodonService } from './mastodon.service';

@Injectable()
export class CompositeAnnouncer implements Announcer {
  private announcers: Announcer[];
  constructor(discord: DiscordService, mastodon: MastodonService) {
    this.announcers = [discord, mastodon];
  }
  async isSupported(_webhook: OwncastWebhook): Promise<boolean> {
    return true;
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
