import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './mobile/app.module';
if (process.env.ENV === 'build') {
    enableProdMode();
}
browserDynamicPlatform().bootstrapModule(AppModule);
