import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { AddressService } from './address.service';
import { Address } from './address';

@Component({
  selector: 'address-list',
  template: `
    <address-form></address-form>
    <md-progress-bar mode="indeterminate" *ngIf="loading"></md-progress-bar>
    <md-grid-list cols="4">
      <md-grid-tile *ngFor="let address of addresses">
        <address [address]="address"></address>
      </md-grid-tile>
    </md-grid-list>
    <p *ngIf="!loading && !addresses.length">Nenhum endereço encontrado</p>
  `,
  styles: ['']
})
export class AddressListComponent implements OnInit {
  addresses: Address[];
  loading = false;

  constructor(private router: Router, private userService: UserService, private addressService: AddressService) { }

  ngOnInit(): void {
    if (!this.userService.isLogged()) {
      this.router.navigateByUrl('login');
    } else {
      this.getAddresses();
    }
  }

  getAddresses(): void {
    this.addresses = this.addressService.addresses;
    this.loading = true;
    this.addressService.update().then(() => this.loading = false, () => this.loading = false);
  }
}