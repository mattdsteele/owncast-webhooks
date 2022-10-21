import { Module } from '@nestjs/common';
import { AnnouncerToken } from './announcers/announcer.service';
import { CompositeAnnouncer } from './announcers/composite-announcers.service';
import { MastodonService } from './announcers/mastodon.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwncastWebhookController } from './owncast-webhook/owncast-webhook.controller';
import { SlackService } from './announcers/slack.service';
import { DiscordWebhookService } from './announcers/discord-webhook.service';

@Module({
  imports: [],
  controllers: [AppController, OwncastWebhookController],
  providers: [
    AppService,
    { provide: AnnouncerToken, useClass: CompositeAnnouncer },
    DiscordWebhookService,
    MastodonService,
    SlackService,
  ],
})
export class AppModule {}
