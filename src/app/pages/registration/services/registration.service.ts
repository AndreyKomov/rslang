/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  signIn(password: string, email: string): void {
    // eslint-disable-next-line no-console
    console.log(password, email);
  }

  logIn(password: string, email: string): void {
    // eslint-disable-next-line no-console
    console.log(password, email);
  }
}
