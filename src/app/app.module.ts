import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2MapModule } from 'ng2-map';

import { AppComponent }  from './app.component';
import { LoginFormComponent } from './login-form.component';
import { AddressComponent } from './address.component';
import { AddressListComponent } from './address-list.component';
import { AddressFormComponent } from './address-form.component';

import { UserService } from './user.service';
import { AddressService } from './address.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    Ng2MapModule,
    MaterialModule.forRoot(),
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
      {
        path: 'address/:id/edit',
        component: AddressFormComponent
      },
    ]),
  ],
  providers:    [ AddressService, UserService ],
  declarations: [ AppComponent, LoginFormComponent, AddressComponent, AddressListComponent, AddressFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }