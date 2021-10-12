import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Announcer, AnnouncerToken } from '../announcers/announcer.service';

@Controller('owncast-webhook')
export class OwncastWebhookController {
  constructor(@Inject(AnnouncerToken) private announcer: Announcer) {}
  @Post()
  handleWebhook(@Body() webhook: OwncastWebhook) {
    if (this.announcer.isSupported(webhook)) {
        console.log('is supported')
      this.announcer.announce(webhook);
    } else {
        console.log('is not supported')

    }
  }
}
