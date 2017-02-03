import { Component, OnInit } from '@angular/core';

import { Address } from './address';
import { AddressService } from './address.service';

@Component({
  providers: [AddressService],
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <h2>Endereços</h2>
    <ul>
      <li *ngFor="let address of addresses">
        <address [address]="address"></address>
      </li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  name = 'Angular'; 
  addresses: Address[];

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAddressesSlowly().then(addresses => this.addresses = addresses);
  }
}