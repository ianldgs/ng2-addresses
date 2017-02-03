import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'login-form',
  template: `
    <form name="login" (ngSubmit)="tryToLogin()">
      <input 
        placeholder="email" 
        name="email"
        type="email"
        required
        [(ngModel)]="email"
      >
      <input 
        placeholder="senha" 
        name="password"
        type="password"
        required
        [(ngModel)]="password"
      >
      <button type="submit">Entrar</button>
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
          alert('Logou');
      }, () => {
          alert('Deu ruim');
      });
  }
}