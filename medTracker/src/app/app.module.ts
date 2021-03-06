import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreContainerComponentModule } from './explore-container/explore-container.module';
import { TabsPageModule } from './tabs/tabs.module';
import { RouterModule } from '@angular/router';
import { WebReqInterceptor } from './web-req.interceptor.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    ExploreContainerComponentModule,
    // TabsPageModule,
    RouterModule,
  ],
  providers: [
    Geolocation,
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true },
    { 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
