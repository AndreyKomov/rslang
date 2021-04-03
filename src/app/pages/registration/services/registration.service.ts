import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  static signIn(
    name: string,
    password: string,
    email: string,
    imgPath: string | ArrayBuffer
  ): void {
    // eslint-disable-next-line no-console
    console.log(name, password, email, imgPath);
  }

  static logIn(name: string, password: string, email: string, imgPath: string | ArrayBuffer): void {
    // eslint-disable-next-line no-console
    console.log(name, password, email, imgPath);
  }
}
