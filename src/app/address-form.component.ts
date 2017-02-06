import { Component } from '@angular/core';

import { Address } from './address';

@Component({
  selector: 'address-form',
  template: `
    <form (ngSubmit)="onSubmit()" #addressForm="ngForm">
      <input name="id" [(ngModel)]="address.id" type="hidden">

      <input id="txtLabel" name="label" [(ngModel)]="address.label" type="text">
      <input id="txtLatitude" name="latitude" [(ngModel)]="address.latitude" type="text">
      <input id="txtLongitude" name="longitude" [(ngModel)]="address.longitude" type="text">
      <input id="txtCity" name="city" [(ngModel)]="address.city" type="text">
      <input id="txtZipCode" name="zipCode" [(ngModel)]="address.zipCode" type="text">
      <input id="txtState" name="state" [(ngModel)]="address.state" type="text">
      <input id="txtComplement" name="complement" [(ngModel)]="address.complement" type="text">
      <input id="txtAddress" name="address" [(ngModel)]="address.address" type="text">
      <input id="txtNeighborhood" name="neighborhood" [(ngModel)]="address.neighborhood" type="text">
      <input id="txtNumber" name="number" [(ngModel)]="address.number" type="text">
      <input id="txtCountry" name="country" [(ngModel)]="address.country" type="text">

      <div class="form-group">
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
      </div>
      <button type="submit" class="btn btn-success" [disabled]="!heroForm.form.valid">Submit</button>
      <button type="button" class="btn btn-default" (click)="newAddress(); addressForm.reset()">New Hero</button>
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