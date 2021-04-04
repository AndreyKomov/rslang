import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import WordsApiServiceComponent from '../../../server/api';

import { IUserDataModel } from '../models/userDataModel';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  constructor(private apiService: WordsApiServiceComponent, private router: Router) {}

  signIn(name: string, password: string, email: string, imgPath: File): void {
    this.apiService.createUser(name, email, password, imgPath);
    this.apiService
      .signIn(email, password)
      .subscribe((data) => WordsApiServiceComponent.setUserToken(data.token));
    this.router.navigate(['']);
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe(
      (data: IUserDataModel) => {
        alert();
        WordsApiServiceComponent.setUserToken(data.token);
        this.router.navigate(['team']);
      },
      (err) => {
        alert('Неверные данные, повторите попытку');
      }
    );
  }
}
