import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { UserService } from './user.service';

@Component({
  selector: 'login-form',
  template: `
    <form name="login" (ngSubmit)="tryToLogin()" #loginForm="ngForm" style="margin-top: 50px;">
      <div class="col-xs">
        <div class="row center-xs">
          <md-input-container class="col-xs-8 col-sm-6 col-md-4">
            <input 
              md-input
              placeholder="email" 
              name="email"
              type="email"
              required
              [(ngModel)]="email"
            >
          </md-input-container>
        </div>
        <div class="row center-xs">
          <md-input-container class="col-xs-8 col-sm-6 col-md-4">
            <input 
              md-input
              placeholder="senha" 
              name="password"
              type="password"
              required
              [(ngModel)]="password"
            >
          </md-input-container>
        </div>
        <div class="row center-xs">
          <div class="col-xs-8 col-sm-6 col-md-4" style="text-align: left;">
            <button md-raised-button type="submit" [disabled]="!loginForm.form.valid">Entrar</button>
          </div>
        </div>
      </div>
    </form>
    `
    //templateUrl: './name.component.html',
    //styleUrls: ['./name.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MdSnackBar
  ) { }

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
        this.snackBar.open('Usuário ou senha inválidos.', null, {
          duration: 2000,
        });
      });
  }
}