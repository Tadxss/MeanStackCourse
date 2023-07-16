import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// 1st. This main.ts file is the first one that executes first before anything else in Angular
if(environment.production) {
  enableProdMode();
}

// 2nd. Then after executing code above it will now load/render the AppModule or app.module.ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
