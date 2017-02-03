import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { LoginFormComponent } from './login-form.component';
import { AddressListComponent } from './address-list.component';
import { AddressComponent } from './address.component';

import { UserService } from './user.service';
import { AddressService } from './address.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'address',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'address',
        component: AddressListComponent
      },
    ]),
  ],
  providers:    [ AddressService, UserService ],
  declarations: [ AppComponent, LoginFormComponent, AddressListComponent, AddressComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }