import dotenv = require('dotenv');
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { MastodonService } from './mastodon.service';

describe('MastodonService', () => {
  let service: MastodonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MastodonService],
    }).compile();

    service = module.get<MastodonService>(MastodonService);
  });

  it.skip('should be defined', () => {
    console.log('announcing');
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
    expect(service.isSupported(event)).toBe(true);
    return service.announce(event).then(() => {
      console.log('done');
    })
  });
});
