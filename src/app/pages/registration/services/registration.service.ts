import { EventEmitter, Injectable } from '@angular/core';
import { WordsApiService } from '@app/server/api';

import { IFileModel } from '../models/FileModel';
import { IUserDataModel } from '../models/userDataModel';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  clickLogin: EventEmitter<boolean> = new EventEmitter();
  clickRegister: EventEmitter<boolean> = new EventEmitter();

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
      alert('Успешная регистрация, войдите');
      this.clickRegister.emit(true);
    });
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe((res: IUserDataModel) => {
      alert('Успешный вход');
      localStorage.setItem('userId', res.userId);
      this.clickLogin.emit(false);
    });
  }
}
