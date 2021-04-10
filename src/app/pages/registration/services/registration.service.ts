import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IFileModel } from '../models/FileModel';

import { IUserDataModel } from '../models/userDataModel';

@Injectable()
export default class RegistrationService {
  private apiUrl = 'https://powerful-river-87536.herokuapp.com/';
  userName: string;
  email: string;
  password: string;
  avatar: IFileModel[];

  constructor(private httpClient: HttpClient) {}

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
    this.userName = name;
    this.email = email;
    this.password = password;
    this.avatar = imgPath;
    const data = new FormData();
    data.append('avatar', newFile);
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    this.httpClient.post<any>(`${this.apiUrl}users`, data).subscribe((res: string) => res);
  }

  logIn(password: string, email: string): void {
    this.email = email;
    this.password = password;
    const data = {
      email,
      password,
    };
    this.httpClient
      .post<any>(`${this.apiUrl}signin`, data, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      .subscribe((res: IUserDataModel) => {
        localStorage.setItem('token', res.token);
        window.location.reload();
      });
  }
}
