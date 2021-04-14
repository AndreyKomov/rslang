import { EventEmitter, Injectable, Output } from '@angular/core';
import { ElectronicTextbookService } from '@app/pages/electronic-textbook/electronic-textbook.service';
import { WordsApiService } from '@app/server/api';

import { IFileModel } from '../models/FileModel';
import { IUserDataModel } from '../models/UserDataModel';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  @Output() isAuthenticated = new EventEmitter<boolean>();
  clickLogin: EventEmitter<boolean> = new EventEmitter();
  clickRegister: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private apiService: WordsApiService,
    private textbookService: ElectronicTextbookService
  ) {}

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
    console.log(newFile);
    this.apiService.createUser(name, email, password, newFile).subscribe(() => {
      alert('Успешная регистрация, войдите');
      this.clickRegister.emit(true);
    });
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe((res: IUserDataModel) => {
      alert('Успешный вход');
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('token', res.token);
      this.clickLogin.emit(false);
      this.isAuthenticated.emit(true);
      this.textbookService.getUserWords(res.userId, res.token);
    });
  }
}
