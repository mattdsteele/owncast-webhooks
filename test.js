import dotenv from "dotenv";
dotenv.config();
import Mastodon from "mastodon-api";
import got from "got";

const { ACCESS_TOKEN, API_URL } = process.env;

const { OWNCAST_SERVER } = process.env;

const getStreamTitle = async () => {
  const configUrl = `${OWNCAST_SERVER}api/config`;
  const res = await got(configUrl, {
    responseType: "json",
  });
  return res.body.streamTitle;
};
(async () => {
  const m = new Mastodon({
    access_token: ACCESS_TOKEN,
    api_url: API_URL,
  });
  const title = await getStreamTitle();

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
})();
