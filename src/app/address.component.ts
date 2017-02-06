import { Component, Input } from '@angular/core';

import { AddressService } from './address.service';
import { Address } from './address';

@Component({
  selector: 'address',
  template: `
    <div>
      <i>icon</i> 
      <h3>{{address.label}}</h3>
      <p>{{address.address}}, {{address.number}} - {{address.neighborhood}}</p>
      <p>{{address.zipCode}}</p>
      <ul>
        <li>
          <a routerLink="/address/{{address.id}}/edit">Editar</a>
        </li>
        <li>
          <button type="button" (click)="delete(address.id)">Apagar</button>
        </li>
      </ul>
    </div>
  `
})
export class AddressComponent {
  @Input()
  address: Address;

  constructor(private addressService: AddressService) { }

  delete(id: number) {
    if (confirm('Deseja mesmo apagar esse endereço?')) {
      this.addressService
        .delete(id)
        .then(() => {
          alert('Endereço removido com sucesso!');
        }, () => {
          alert('Erro desconhecido');
        });
    }
  }
}