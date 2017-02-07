import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BASE_API_URL, BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(private http: Http) {
    super();
  }

  isLogged(): boolean {
    return !!sessionStorage.getItem('access_token');
  }

  login(email: string, password: string): Promise<any> {
    const headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ZTZiZGVjY2ItNzM1OC00OTk3LWIzYzAtODk2NDBhZjEyZGRlOmQ5OWNmMTU0LTFjZGYtNDRiMi04MDJmLWU1YzhiYmU5NjY5OA==');

    return this.http
      .post(
        `${BASE_API_URL}/security/oauth/token?grant_type=password&username=${email}&password=${password}`,
        { },
        { headers }
      )
      .toPromise()
      .then(res => res.json())
      .then(res => {
        sessionStorage.setItem('access_token', res.access_token);
      });
  }

  logout() {
    sessionStorage.removeItem('access_token');
  }
}