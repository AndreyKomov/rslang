import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import WordsApiServiceComponent from '../../../server/api';

import { IUserDataModel } from '../models/userDataModel';

@Injectable({
  providedIn: 'root',
})
export default class RegistrationService {
  constructor(private apiService: WordsApiServiceComponent, private router: Router) {}

  singUp(name: string, password: string, email: string, imgPath: File): void {
    this.apiService.createUser(name, email, password, imgPath).subscribe((res) => res, null, () => {
      this.logIn(password, email);
      this.router.navigate(['']);
    });
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['']);
    });
  }
}
