import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {HTTP_INTERCEPTORS,  HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './services/interceptor.service';
import { Camera} from '@ionic-native/camera/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
    ,Camera],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
