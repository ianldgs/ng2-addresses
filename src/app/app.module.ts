import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { LoginFormComponent } from './login-form.component';
import { AddressComponent } from './address.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, LoginFormComponent, AddressComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }