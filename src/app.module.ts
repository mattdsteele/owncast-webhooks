import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MastodonService } from './mastodon/mastodon.service';
import { OwncastWebhookController } from './owncast-webhook/owncast-webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, OwncastWebhookController],
  providers: [AppService, MastodonService],
})
export class AppModule {}
