import { Injectable } from '@angular/core';

import { Address } from './address';
import { ADDRESSES } from './mock-addresses'

@Injectable()
export class AddressService {
  constructor() { }

  getAddresses(): Promise<Address[]> {
    return Promise.resolve(ADDRESSES);
  }

  getAddressesSlowly(): Promise<Address[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getAddresses()), 2000);
    });
  }
}