import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { AddressService } from './address.service';
import { Address } from './address';

@Component({
  selector: 'address-form',
  template: `
    <md-card>
    
    <div class="row">
      <div class="col-xs-12">
        <ng2-map 
          *ngIf="address.latitude && address.longitude" 
          center="{{address.latitude}},{{address.longitude}}"
          style="padding-bottom: 20px;"
        >
          <marker position="{{address.latitude}},{{address.longitude}}"></marker>
        </ng2-map>
      </div>
    </div>
    
    <form (ngSubmit)="onSubmit()" #addressForm="ngForm">
      <input name="id" [(ngModel)]="address.id" type="hidden">

      <div class="row">
        <div class="col-xs-12">
          <md-input-container style="width: 100%;">
            <input md-input id="txtLabel" name="label" placeholder="Nome" [(ngModel)]="address.label" type="text">
          </md-input-container>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <md-input-container style="width: 100%;">
            <input 
              md-input
              places-auto-complete
              autocomplete="off"
              placeholder="Endereço"
              name="searchAddress"
              [(ngModel)]="searchAddress"
              (initialized$)="initialized($event)"
              (place_changed)="placeChanged(place)"
              [types]="['geocode']"
            >
          </md-input-container>
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12">
  
          <md-input-container>
            <input 
              md-input 
              id="txtZipCode" 
              name="zipCode" 
              placeholder="CEP" 
              [(ngModel)]="address.zipCode"
              type="text"
              maxlength="9"
            >
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtCountry" name="country" placeholder="País" [(ngModel)]="address.country" type="text">
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtState" name="state" placeholder="Estado" [(ngModel)]="address.state" type="text">
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtCity" name="city" placeholder="Cidade" [(ngModel)]="address.city" type="text">
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtNeighborhood" name="neighborhood" placeholder="Bairro" [(ngModel)]="address.neighborhood" type="text">
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtAddress" name="address" placeholder="Rua" [(ngModel)]="address.address" type="text">
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtNumber" name="number" placeholder="Número" [(ngModel)]="address.number" type="number">
          </md-input-container>
    
          <md-input-container>
            <input md-input id="txtComplement" name="complement" placeholder="Complemento" [(ngModel)]="address.complement" type="text"> 
          </md-input-container>
  
        </div>
  
      </div>

      <input id="txtLatitude" name="latitude" placeholder="Latitude" [(ngModel)]="address.latitude" type="hidden">
      <input id="txtLongitude" name="longitude" placeholder="Longitude" [(ngModel)]="address.longitude" type="hidden">

      <div class="row">
        <div class="col-xs-12">
          <button md-raised-button type="submit" [disabled]="!address.latitude || !address.longitude">Salvar</button>
        </div>
      </div>
      
    </form>
    
    </md-card>
  `,
  styles: ['']
})
export class AddressFormComponent implements OnInit {
  address: Address;
  autocomplete: google.maps.places.Autocomplete;
  searchAddress: string;

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MdSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  newAddress() {
    this.address = new Address();
    this.searchAddress = '';
  }

  ngOnInit() {
    this.newAddress();

    if (!this.userService.isLogged()) {
      this.router.navigateByUrl('login');
      return;
    }

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

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }

  placeChanged() {
    const place = this.autocomplete.getPlace();
    const address = this.addressService.fromGooglePlace(place);

    this.mergeAddress(address);

    this.ref.detectChanges();
  }

  mergeAddress(address: Address) {
    this.address.zipCode = address.zipCode;
    this.address.country = address.country;
    this.address.state = address.state;
    this.address.city = address.city;
    this.address.neighborhood = address.neighborhood;
    this.address.address = address.address;
    this.address.number = address.number;
    this.address.latitude = address.latitude;
    this.address.longitude = address.longitude;
  }
}