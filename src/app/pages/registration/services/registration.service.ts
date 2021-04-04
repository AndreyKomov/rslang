import { Injectable } from '@angular/core';

import WordsApiServiceComponent from '../../../server/api';

import { IUserDataModel } from '../models/userDataModel';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  constructor(private apiService: WordsApiServiceComponent) {}

  signIn(name: string, password: string, email: string, imgPath: File): void {
    this.apiService.createUser(name, email, password, imgPath);
  }

  logIn(password: string, email: string): void {
    let userData: IUserDataModel;
    this.apiService.signIn(email, password).subscribe((data) => (userData = data));
    console.log(userData);
    if (userData) {
      WordsApiServiceComponent.setUserToken(userData.token);
    } else {
      console.log(userData.message);
      alert('Неверные данные, повторите попытку');
    }
  }
}
