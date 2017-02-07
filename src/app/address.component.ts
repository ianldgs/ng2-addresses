import { Component, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AddressService } from './address.service';
import { Address } from './address';

@Component({
  selector: 'address',
  template: `
    <md-card>
      <md-card-header>
        <md-icon md-card-avatar class="example-header-image">place</md-icon>
        <md-card-title>{{address.label}}</md-card-title>
        <md-card-subtitle>{{address.address}}, {{address.number}} - {{address.neighborhood}}</md-card-subtitle>
        <span class="app-toolbar-filler"></span>
        <button md-icon-button [mdMenuTriggerFor]="menu">
          <md-icon>more_vert</md-icon>
        </button>
        <md-menu #menu="mdMenu" x-position="before">
          <a md-menu-item routerLink="/address/{{address.id}}/edit">
            <span>Editar</span>
          </a>
          <button md-menu-item (click)="delete(address.id)">
            <span>Remover</span>
          </button>
        </md-menu>
      </md-card-header>
      <md-card-content>
        <ng2-map 
          center="{{address.latitude}},{{address.longitude}}"
          style="height: 220px"
        >
          <marker position="{{address.latitude}},{{address.longitude}}"></marker>
        </ng2-map>
      </md-card-content>
    </md-card>
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
              this.snackBar.open('Erro desconhecido.', null, {
                duration: 2000,
              });
            });
        }
      });
  }
}