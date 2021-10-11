import { Body, Controller, Post } from '@nestjs/common';

@Controller('owncast-webhook')
export class OwncastWebhookController {
    @Post()
    handleWebhook(@Body() webhook: OwncastWebhook) {
        console.log('Handled webhook');
        console.log(webhook);
        return 'Handled webhook';
    }
}
