import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


  // const socket = io();

  // socket.on('MyWebSocketServerEvent', function(msg) {
  //   // message received from server, do something
  //   console.log(msg);
  // });
