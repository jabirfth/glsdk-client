import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LoopBackConfig } from './app/shared/sdk/lb.config';
import { LocaleUtils } from './locale/LocaleUtils';

if (environment.production) {
  enableProdMode();
}

declare const require: any;

const currentLanguage = LocaleUtils.getCurrentLanguage();
const translations = require(`raw-loader!./locale/messages.${currentLanguage}.xlf`);

LoopBackConfig.setBaseURL(environment.loopback.baseUrl);
LoopBackConfig.setApiVersion(environment.loopback.apiVersion);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
  ],
});
