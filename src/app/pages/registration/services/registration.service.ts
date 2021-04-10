import { Injectable } from '@angular/core';

import WordsApiServiceComponent from '../../../server/api';
import { IFileModel } from '../models/FileModel';

import { IUserDataModel } from '../models/userDataModel';

@Injectable()
export default class RegistrationService {
  constructor(private apiService: WordsApiServiceComponent) {}

  singUp(name: string, password: string, email: string, imgPath: IFileModel[]): void {
    const newFile =
      imgPath === undefined
        ? new File(
            ['../../../../assets/img/no-avatar.png'],
            '../../../../assets/img/no-avatar.png',
            {
              type: 'image/jpg',
            }
          )
        : imgPath[0];
    this.apiService.createUser(name, email, password, newFile).subscribe((res: string) => res);
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe((res: IUserDataModel) => {
      localStorage.setItem('token', res.token);
      window.location.reload();
    });
  }
}
