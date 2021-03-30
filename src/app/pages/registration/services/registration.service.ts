/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  signIn(name: string, password: string, email: string, imgPath: string | ArrayBuffer): void {
    // eslint-disable-next-line no-console
    console.log(name, password, email, imgPath);
  }

  logIn(name: string, password: string, email: string, imgPath: string | ArrayBuffer): void {
    // eslint-disable-next-line no-console
    console.log(name, password, email, imgPath);
  }
}
