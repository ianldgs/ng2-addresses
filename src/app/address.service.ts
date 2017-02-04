import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BaseService, BASE_API_URL, BASE_API_PATH } from './base.service';

import { Address } from './address';

@Injectable()
export class AddressService extends BaseService {
  url = BASE_API_URL + BASE_API_PATH + '/address';

  constructor(private http: Http) {
    super();
  }

  getAddresses(): Promise<Address[]> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.http
      .get(this.url, { headers })
      .toPromise()
      .then(res => res.json().data as Address[]);
  }
}