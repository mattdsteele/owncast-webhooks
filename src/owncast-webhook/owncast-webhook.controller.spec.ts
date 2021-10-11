import { Test, TestingModule } from '@nestjs/testing';
import { OwncastWebhookController } from './owncast-webhook.controller';

const examplePayload = {
  type: 'STREAM_STARTED',
  eventData: {
    id: 'wq6BA_v7g',
    name: 'Matt Steele',
    streamTitle: 'Fake Bike Racing on Zwift',
    summary: "Matt's stream world\nZwift races every Tuesday at 9pm CST!",
    timestamp: '2021-10-11T13:24:08.793579896Z',
  },
};

describe('OwncastWebhookController', () => {
  let controller: OwncastWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwncastWebhookController],
    }).compile();

    controller = module.get<OwncastWebhookController>(OwncastWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
