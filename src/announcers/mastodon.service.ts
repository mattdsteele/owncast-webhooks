import { Injectable } from '@nestjs/common';
import Mastodon = require('mastodon-api');
import { Announcer } from './announcer.service';
const { MASTODON_ACCESS_TOKEN, MASTODON_API_URL, OWNCAST_SERVER_URL } =
  process.env;

@Injectable()
export class MastodonService implements Announcer {
  private m: any;
  isSupported(_webhook: OwncastWebhook): boolean {
    console.log('checking if supported');
    console.log(MASTODON_ACCESS_TOKEN, MASTODON_API_URL, OWNCAST_SERVER_URL);
    if (!!this.m) {
      return true;
    }
    console.log('not cached, checking');

    if (!!MASTODON_ACCESS_TOKEN && !!MASTODON_API_URL) {
      const m = new Mastodon({
        access_token: MASTODON_ACCESS_TOKEN,
        api_url: MASTODON_API_URL,
      });
      this.m = m;
      console.log('values set');
      return true;
    }
    return false;
  }
  announce(webhook: OwncastWebhook): Promise<void> {
    console.log('announcing');
    const title = webhook.eventData.streamTitle;

    return new Promise((res, rej) => {
      this.m.post(
        'statuses',
        {
          status: `Started streaming on my #owncast server: ${title}
${OWNCAST_SERVER_URL}`,
        },
        (err, resp) => {
          if (err) {
            rej(err);
          }
          res();
          console.log(resp);
        },
      );
    });
  }
}
