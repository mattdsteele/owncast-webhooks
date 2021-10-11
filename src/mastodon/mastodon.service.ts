import { Injectable } from '@nestjs/common';
import Mastodon from "mastodon-api";
const { ACCESS_TOKEN, API_URL } = process.env;
const OWNCAST_SERVER = 'PLACEHOLDER';

@Injectable()
export class MastodonService {
    toot() {
  const m = new Mastodon({
    access_token: ACCESS_TOKEN,
    api_url: API_URL,
  });
  const title = `Title`;

  m.post(
    "statuses",
    {
      status: `Started streaming on my #owncast server: ${title}
${OWNCAST_SERVER}`,
    },
    (err, resp) => {
      if (err) {
      }
      console.log(resp);
    }
  );
    }
}
