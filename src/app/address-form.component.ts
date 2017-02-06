import { Component } from '@angular/core';

import { Address } from './address';

@Component({
  selector: 'address-form',
  template: `
    <form (ngSubmit)="onSubmit()" #addressForm="ngForm">
      <input name="id" [(ngModel)]="address.id" type="hidden">

      <label for="txtLabel">Nome</label>
      <input id="txtLabel" name="label" [(ngModel)]="address.label" type="text">

      <label for="txtZipCode">CEP</label>
      <input id="txtZipCode" name="zipCode" [(ngModel)]="address.zipCode" type="text">

      <label for="txtCountry">País</label>
      <input id="txtCountry" name="country" [(ngModel)]="address.country" type="text">

      <label for="txtState">Estado</label>
      <input id="txtState" name="state" [(ngModel)]="address.state" type="text">

      <label for="txtCity">Cidade</label>
      <input id="txtCity" name="city" [(ngModel)]="address.city" type="text">

      <label for="txtNeighborhood">Bairro</label>
      <input id="txtNeighborhood" name="neighborhood" [(ngModel)]="address.neighborhood" type="text">

      <label for="txtAddress">Rua</label>
      <input id="txtAddress" name="address" [(ngModel)]="address.address" type="text">

      <label for="txtNumber">Número</label>
      <input id="txtNumber" name="number" [(ngModel)]="address.number" type="text">

      <label for="txtComplement">Complemento</label>
      <input id="txtComplement" name="complement" [(ngModel)]="address.complement" type="text"> 

      <label for="txtLatitude">Latitude</label>
      <input id="txtLatitude" name="latitude" [(ngModel)]="address.latitude" type="text">

      <label for="txtLongitude">Longitude</label>
      <input id="txtLongitude" name="longitude" [(ngModel)]="address.longitude" type="text">

      <button type="submit" [disabled]="!addressForm.form.valid">Submit</button>
      <button type="button" (click)="newAddress(); addressForm.reset()">Cancelar</button>

      <!--div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel">
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control" id="alterEgo"
               [(ngModel)]="model.alterEgo" name="alterEgo">
      </div>
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" id="power"
                required
                [(ngModel)]="model.power" name="power"
                #power="ngModel">
          <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
        </select>
        <div [hidden]="power.valid || power.pristine" class="alert alert-danger">
          Power is required
        </div>
      </div-->
      
    </form>
  `,
  styles: ['']
})
export class AddressFormComponent {
  address: Address;

  constructor() {
    this.newAddress();
  }

  newAddress() {
    this.address = new Address();
  }

  onSubmit() {

  }
}