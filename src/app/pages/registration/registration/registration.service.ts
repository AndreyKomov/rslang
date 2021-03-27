import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  test: string; // delete this when you'll change this file

  addData(password: string, email: string): void {
    this.test = password; // delete this when you'll change this file
    this.test = email; // delete this when you'll change this file
    // console.log(password, email);
  }

  login(password: string, email: string): void {
    this.test = password; // delete this when you'll change this file
    this.test = email; // delete this when you'll change this file
    // console.log(password, email);
  }
}
