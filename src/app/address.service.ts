import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BaseService, BASE_API_URL, BASE_API_PATH } from './base.service';

import { Address } from './address';

@Injectable()
export class AddressService extends BaseService {
  url = BASE_API_URL + BASE_API_PATH + '/address';
  addresses: Address[] = [];

  constructor(private http: Http) {
    super();
  }

  all(): Promise<Address[]> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.http
      .get(this.url, { headers })
      .toPromise()
      .then(res => res.json().data as Address[]);
  }

  get(id: number): Promise<Address> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.http
      .get(this.url + '/' + id, { headers })
      .toPromise()
      .then(res => res.json() as Address);
  }

  save(address: Address): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    headers.append('Content-Type', 'application/json');

    address.availableItems = address.availableItems || [];

    return this.http
      .request(this.url + (address.id ? '/' + address.id : ''), {
        headers,
        method: address.id ? 'PUT' : 'POST',
        body: address
      })
      .toPromise()
      .then(res => res.json());
  }

  preDelete(address: Address | number) {
    let id: number;
    if (address instanceof Address) {
      id = address.id;
    } else {
      id = address;
    }

    let _addresses = this.addresses.filter(address => id != address.id);
    this.addresses.length = 0;

    _addresses.forEach(address => {
      this.addresses.push(address);
    });
  }

  delete(address: Address | number): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    let id;
    if (address instanceof Address) {
      id = address.id;
    } else {
      id = address;
    }

    return this.http
      .delete(this.url + '/' + id, { headers })
      .toPromise();
  }

  update(): Promise<Address[]> {
    return this.all().then((addresses: Address[] = []) => {
      this.addresses.length = 0;
      addresses.reverse().forEach(address => {
        this.addresses.push(address);
      });
      return this.addresses;
    });
  }
}