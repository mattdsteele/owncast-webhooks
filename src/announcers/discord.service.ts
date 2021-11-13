import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import Discord = require('discord.js');
const { DISCORD_BOT_TOKEN, DISCORD_CHANNEL, OWNCAST_SERVER_URL } = process.env;

const channelList: string[] = DISCORD_CHANNEL.split(',');

@Injectable()
export class DiscordService implements Announcer {
  client: Discord.Client;
  channel: Discord.TextChannel;
  postableChannels: Discord.TextChannel[];
  async isSupported(_webhook: OwncastWebhook): Promise<boolean> {
    if (!!this.client) {
      return true;
    }
    if (!!DISCORD_BOT_TOKEN) {
      this.client = new Discord.Client();
      const loggedIn = await this.client.login(DISCORD_BOT_TOKEN);
      console.log('logged in', loggedIn);
      console.log('searching for channels', DISCORD_CHANNEL, channelList);
      console.log(this.client.channels.cache.size);
      const channel = this.client.channels.cache.find(
        (x: any) => channelList.includes(x.name)
      );
      const allChannelsFound: any[] = this.client.channels.cache.filter(
        (x: any) => channelList.includes(x.name)
      );
      console.log(`all channels found size: ${allChannelsFound.length}`)
      console.log(channel);
      // Cache all postable channels
      this.postableChannels = allChannelsFound.filter(c => c.isText());
      return this.postableChannels.length > 0;
    }
    return false;
  }
  async announce(webhook: OwncastWebhook): Promise<void> {
    const message = `Started streaming: ${webhook.eventData.streamTitle}
${OWNCAST_SERVER_URL}`;
    console.log(`sending discord message to ${this.postableChannels.length} servers`);
    await this.postableChannels.map(c => c.send(message));
    console.log('sent');

  }
}
