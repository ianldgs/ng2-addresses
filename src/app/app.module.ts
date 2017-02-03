import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AddressComponent } from './address.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, AddressComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }