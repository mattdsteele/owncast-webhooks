import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Announcer, AnnouncerToken } from '../announcers/announcer.service';

@Controller('owncast-webhook')
export class OwncastWebhookController {
  constructor(@Inject(AnnouncerToken) private announcer: Announcer) {}
  @Post()
  handleWebhook(@Body() webhook: OwncastWebhook) {
    if (this.announcer.isSupported(webhook)) {
      this.announcer.announce(webhook);
    }
  }
}
