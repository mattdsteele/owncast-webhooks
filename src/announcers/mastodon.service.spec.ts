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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
