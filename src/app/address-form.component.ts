import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';

import { AddressService } from './address.service';
import { Address } from './address';

@Component({
  selector: 'address-form',
  template: `
    <md-card><md-card-content>
    <form (ngSubmit)="onSubmit()" #addressForm="ngForm">
      <input name="id" [(ngModel)]="address.id" type="hidden">

      <!--label for="txtLabel">Nome</label-->
      <md-input-container>
        <input md-input id="txtLabel" name="label" placeholder="Nome" [(ngModel)]="address.label" type="text">
      </md-input-container>

      <!--label for="txtZipCode">CEP</label-->
      <md-input-container>
        <input md-input id="txtZipCode" name="zipCode" placeholder="CEP" [(ngModel)]="address.zipCode" type="number">
      </md-input-container>

      <!--label for="txtCountry">País</label-->
      <md-input-container>
        <input md-input id="txtCountry" name="country" placeholder="País" [(ngModel)]="address.country" type="text">
      </md-input-container>

      <!--label for="txtState">Estado</label-->
      <md-input-container>
        <input md-input id="txtState" name="state" placeholder="Estado" [(ngModel)]="address.state" type="text">
      </md-input-container>

      <!--label for="txtCity">Cidade</label-->
      <md-input-container>
        <input md-input id="txtCity" name="city" placeholder="Cidade" [(ngModel)]="address.city" type="text">
      </md-input-container>

      <!--label for="txtNeighborhood">Bairro</label-->
      <md-input-container>
        <input md-input id="txtNeighborhood" name="neighborhood" placeholder="Bairro" [(ngModel)]="address.neighborhood" type="text">
      </md-input-container>

      <!--label for="txtAddress">Rua</label-->
      <md-input-container>
        <input md-input id="txtAddress" name="address" placeholder="Rua" [(ngModel)]="address.address" type="text">
      </md-input-container>

      <!--label for="txtNumber">Número</label-->
      <md-input-container>
        <input md-input id="txtNumber" name="number" placeholder="Número" [(ngModel)]="address.number" type="number">
      </md-input-container>

      <!--label for="txtComplement">Complemento</label-->
      <md-input-container>
        <input md-input id="txtComplement" name="complement" placeholder="Complemento" [(ngModel)]="address.complement" type="text"> 
      </md-input-container>

      <!--label for="txtLatitude">Latitude</label-->
      <md-input-container>
        <input md-input id="txtLatitude" name="latitude" placeholder="Latitude" [(ngModel)]="address.latitude" type="number" max="90" min="-90">
      </md-input-container>

      <!--label for="txtLongitude">Longitude</label-->
      <md-input-container>
        <input md-input id="txtLongitude" name="longitude" placeholder="Longitude" [(ngModel)]="address.longitude" type="number" max="180" min="-180">
      </md-input-container>

      <button md-button type="button" (click)="newAddress(); addressForm.reset()">Cancelar</button>
      <button md-raised-button type="submit" [disabled]="!addressForm.form.valid">Submit</button>

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
    </md-card-content></md-card>
  `,
  styles: ['']
})
export class AddressFormComponent implements OnInit {
  address: Address;

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MdSnackBar
  ) { }

  newAddress() {
    this.address = new Address();
  }

  ngOnInit() {
    this.newAddress();

    this.route.params
      .switchMap((params: Params) => {
        if (params['id']) {
          return this.addressService.get(+params['id']);
        } else {
          return Promise.resolve(new Address());
        }
      })
      .subscribe((address: Address) => {
        this.address = address;
      }, () => {
        this.snackBar.open('Erro desconhecido', null, {
          duration: 2000,
        });
      });
  }

  onSubmit() {
    this.addressService
      .save(this.address)
      .then(res => {
        this.snackBar.open('Salvo.', null, {
          duration: 2000,
        });

        if ('/address' === this.router.url) {
          this.newAddress();
          this.addressService.update();
        } else {
          this.router.navigateByUrl('address');
        }       
      }, () => {
        this.snackBar.open('Erro desconhecido', null, {
          duration: 2000,
        });
      });
  }
}