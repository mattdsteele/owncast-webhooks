import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Announcer, AnnouncerToken } from '../announcers/announcer.service';

@Controller('owncast-webhook')
export class OwncastWebhookController {
  constructor(@Inject(AnnouncerToken) private announcer: Announcer) {}
  @Post()
  async handleWebhook(@Body() webhook: OwncastWebhook) {
    if (this.announcer.isSupported(webhook)) {
        console.log('is supported')
      await this.announcer.announce(webhook);
    } else {
        console.log('is not supported')

    }
  }
}
