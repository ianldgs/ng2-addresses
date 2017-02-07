import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng2MapComponent } from 'ng2-map';

import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  template: `
    <md-sidenav-layout>
      <md-toolbar color="primary">
        <a routerLink="address" style="color: #fff; text-decoration: none;">Endereços</a>
        <span class="app-toolbar-filler"></span>
        <button *ngIf="state && state.isLogged" md-button mdTooltip="Sair" (click)="logout()" style="min-width: 0">
          <md-icon>clear</md-icon>
        </button>
      </md-toolbar>
      <router-outlet></router-outlet>
    </md-sidenav-layout>
  `,
  styles: [`
    
  `],
})
export class AppComponent implements OnInit {
  state: any;

  constructor(private userService: UserService, private router: Router) {
    Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?libraries=visualization,places&key=AIzaSyBQ7MHSvEKfa3ZYpPtRImS1pksuo8EzdmQ';
    this.state = this.userService.state;
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}