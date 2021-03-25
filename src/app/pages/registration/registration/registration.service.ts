import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  password: string;
  email: string;

  addData(password: string, email: string): void {
    this.password = password;
    this.email = email;
    console.log(this.password, this.email);
  }

  login(password: string, email: string): void {
    console.log(password, email);
  }

  constructor() {}
}
