import { Module } from '@nestjs/common';
import { AnnouncerToken } from './announcers/announcer.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompositeAnnouncer } from './composite-announcers.service';
import { OwncastWebhookController } from './owncast-webhook/owncast-webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, OwncastWebhookController],
  providers: [AppService, { provide: AnnouncerToken, useClass: CompositeAnnouncer}],
})
export class AppModule {}
