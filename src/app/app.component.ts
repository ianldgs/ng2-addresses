import { Component, OnInit } from '@angular/core';

import { Ng2MapComponent } from 'ng2-map';

@Component({
  selector: 'my-app',
  template: `
    <md-sidenav-layout>
      <md-toolbar color="primary">
        <a routerLink="address" style="color: #fff; text-decoration: none;">Endereços</a>
      </md-toolbar>
      <router-outlet></router-outlet>
    </md-sidenav-layout>
  `,
  styles: [`
    
  `],
})
export class AppComponent implements OnInit {
  constructor() {
    Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?libraries=visualization,places&key=AIzaSyBQ7MHSvEKfa3ZYpPtRImS1pksuo8EzdmQ';
  }

  ngOnInit() {
  }
}