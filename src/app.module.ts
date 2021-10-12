import { Module } from '@nestjs/common';
import { AnnouncerToken } from './announcers/announcer.service';
import { MastodonService } from './announcers/mastodon.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwncastWebhookController } from './owncast-webhook/owncast-webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, OwncastWebhookController],
  providers: [AppService, { provide: AnnouncerToken, useClass: MastodonService}],
})
export class AppModule {}
