import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  providers: [UserService],
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
export class LoginFormComponent {
  email: string;
  password: string;

  constructor(private userService: UserService) { }

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