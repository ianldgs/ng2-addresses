import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { AddressService } from './address.service';
import { Address } from './address';

@Component({
  selector: 'address-list',
  template: `
    <h2>Endereços</h2>
    <address-form></address-form>
    <p *ngIf="!addresses">Carregando...</p>
    <ul *ngIf="addresses">
      <li *ngFor="let address of addresses">
        <address [address]="address"></address>
      </li>
    </ul>
    <p *ngIf="addresses && !addresses.length">Nenhum endereço encontrado</p>
  `,
  styles: ['']
})
export class AddressListComponent implements OnInit {
  addresses: Address[];

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
    this.addressService.update();
  }
}