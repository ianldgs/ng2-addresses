import { Component, Input } from '@angular/core';

import { Address } from './address';

@Component({
  selector: 'address',
  template: `
    <div>
      <i>icon</i> 
      <h3>{{address.name}}</h3>
      <p>{{address.street}}, {{address.number}} - {{address.district}}</p>
      <p>{{address.zip}}</p>
    </div>
  `
})
export class AddressComponent {
  @Input()
  address: Address;
}