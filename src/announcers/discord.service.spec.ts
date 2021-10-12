import dotenv = require('dotenv');
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';

describe('DiscordService', () => {
  let service: DiscordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordService],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it.skip('should be defined', async () => {
    const event: OwncastWebhook = {
      type: 'STREAM_STARTED',
      eventData: {
        id: 'asdf',
        name: 'asdf',
        streamTitle: 'asdf',
        summary: 'sdf',
        timestamp: '2343'
      }
    }
    const supported = await service.isSupported(event);
    expect(supported).toBe(true);
    await service.announce(event);
  });
});
