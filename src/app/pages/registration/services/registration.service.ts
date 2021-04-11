import { Injectable } from '@angular/core';
import { WordsApiService } from '@app/server/api';

import { IFileModel } from '../models/FileModel';
import { IUserDataModel } from '../models/userDataModel';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private apiService: WordsApiService) {}

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
    this.apiService.createUser(name, email, password, newFile).subscribe(() => {
      this.logIn(password, email);
    });
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe((res: IUserDataModel) => {
      localStorage.setItem('token', res.token);
      // window.location.reload();
    });
  }
}
