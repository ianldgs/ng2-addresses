import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'login-form',
  template: `
    <form name="login" (ngSubmit)="tryToLogin()" #loginForm="ngForm">
      <md-grid-list cols="1" rowHeight="100px">
        <md-grid-tile>
          <md-input-container>
            <input 
              md-input
              placeholder="email" 
              name="email"
              type="email"
              required
              [(ngModel)]="email"
            >
          </md-input-container>
          <md-input-container>
            <input 
              md-input
              placeholder="senha" 
              name="password"
              type="password"
              required
              [(ngModel)]="password"
            >
          </md-input-container>
          <button md-raised-button type="submit" [disabled]="!loginForm.form.valid">Entrar</button>
        </md-grid-tile>
      </md-grid-list>
    </form>
    `
    //templateUrl: './name.component.html',
    //styleUrls: ['./name.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isLogged()) {
      this.router.navigateByUrl('address');
    }
  }

  tryToLogin() {
    this.userService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('address');
      }, () => {
        alert('Deu ruim');
      });
  }
}