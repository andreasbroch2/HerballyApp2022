import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faBoxOpen, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FontAwesomeModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faPencilAlt, faBoxOpen, faMinus, faPlus, faTimes);
}
}
 