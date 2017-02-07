import { Component, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';

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

  constructor(private addressService: AddressService, private snackBar: MdSnackBar) { }

  delete(id: number) {
    this.addressService.preDelete(id);

    const snackbar = this.snackBar.open('Excluído.', 'Desfazer', {
      duration: 2000,
    });

    let cancelled = false;
    snackbar
      .onAction()
      .toPromise()
      .then(() => {
        cancelled = true;
        this.addressService.update();
      });

    snackbar
      .afterDismissed()
      .toPromise()
      .then(() => {
        if (!cancelled) {
          this.addressService
            .delete(id)
            .then(() => {
              this.addressService.update();
            }, () => {
              this.snackBar.open('Erro desconhecido.');
            });
        }
      });
  }
}