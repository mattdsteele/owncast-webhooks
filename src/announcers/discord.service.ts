import { Injectable } from '@nestjs/common';
import { Announcer } from './announcer.service';
import Discord = require('discord.js');
const { DISCORD_BOT_TOKEN, DISCORD_CHANNEL, OWNCAST_SERVER_URL } = process.env;

@Injectable()
export class DiscordService implements Announcer {
  client: Discord.Client;
  channel: Discord.TextChannel;
  async isSupported(_webhook: OwncastWebhook): Promise<boolean> {
    if (!!this.client) {
      return true;
    }
    if (!!DISCORD_BOT_TOKEN) {
      this.client = new Discord.Client();
      const loggedIn = await this.client.login(DISCORD_BOT_TOKEN);
      const channel = this.client.channels.cache.find(
        (x: any) => x.name === DISCORD_CHANNEL,
      );
      if (channel.isText()) {
        this.channel = channel as Discord.TextChannel;
      }
      return true;
    }
    return false;
  }
  async announce(webhook: OwncastWebhook): Promise<void> {
    const message = `Started streaming: ${webhook.eventData.streamTitle}
${OWNCAST_SERVER_URL}`;
    await this.channel.send(message);
  }
}
