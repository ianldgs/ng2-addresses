import { Component, Input } from '@angular/core';

import { Address } from './address';

@Component({
  selector: 'address',
  template: `
    <div>
      <i>icon</i> 
      <h3>{{address.label}}</h3>
      <p>{{address.address}}, {{address.number}} - {{address.neighborhood}}</p>
      <p>{{address.zipCode}}</p>
    </div>
  `
})
export class AddressComponent {
  @Input()
  address: Address;
}