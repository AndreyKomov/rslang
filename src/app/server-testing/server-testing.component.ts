import { Component, OnInit } from '@angular/core';
import WordApiServiceComponent from '../server/api';

@Component({
  selector: 'app-server-testing',
  templateUrl: './server-testing.component.html',
  styleUrls: ['./server-testing.component.scss'],
})
export default class ServerTestingComponent implements OnInit {
  wordById: string | null;

  getUser: string | null;

  createdUserWord: string | null;

  getedAllUsersWords: string | null;

  getedUserWordById: string | null;

  updatedUserWord: string | null;

  deletedUserWord: string | null;

  setedUserSettings: string | null;

  getWordsByPageAndGroup: string | null;

  getedUserSettings: string | null;

  setedUserStatistic: string | null;

  getedUserStatistic: string | null;

  refreshedTokenUser: string | null;

  selectedFile: File = null;

  token: string | null =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsImlhdCI6MTYxNzQwNzA0MiwiZXhwIjoxNjE3NDIxNDQyfQ.xHNbjrb5ZhAs4VYk8Y86InZQfqXSKjtKS-u6h-e3kSo';

  constructor(public api: WordApiServiceComponent) {}

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  ngOnInit() {
    this.api.getWordById('5e9f5ee35eb9e72bc21af4a2').subscribe((data) => {
      this.wordById = data.word;
    });
    this.api.getWordsByPageAndGroup(0, 0).subscribe((data) => {
      this.getWordsByPageAndGroup = JSON.stringify(data);
    });
    this.api.getUser('60660e296b85e609a078ee2c', this.token).subscribe((data) => {
      this.getUser = JSON.stringify(data);
    });
  }

  createUser() {
    this.api
      .createUser('vitalik', 'vitg54uy@mail.ru', 'Vit1767812++', this.selectedFile)
      .subscribe((res) => {
        console.log(res);
      });
  }

  updateUser() {
    this.api
      .updateUser(
        '60660e296b85e609a078ee2c',
        this.token,
        'vitali',
        'vit16784675@mail.ru',
        'Vit1767812++',
        this.selectedFile
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  signIn() {
    this.api.signIn('vit16784675@mail.ru', 'Vit1767812++').subscribe((res) => {
      console.log('signIn: ', res);
    });
  }

  createUserWord() {
    const optional = {
      optionalField: 'free',
      isDeleted: true,
    };
    this.api
      .createUserWord(
        '60660e296b85e609a078ee2c',
        '5e9f5ee35eb9e72bc21af4a0',
        this.token,
        'weak',
        optional
      )
      .subscribe((res) => {
        this.createdUserWord = JSON.stringify(res);
        console.log(res);
      });
  }

  getAllUsersWords() {
    this.api.getAllUsersWords('60660e296b85e609a078ee2c', this.token).subscribe((res) => {
      this.getedAllUsersWords = JSON.stringify(res);
      console.log(res);
    });
  }

  getUserWordById() {
    this.api
      .getUserWordById('60660e296b85e609a078ee2c', '5e9f5ee35eb9e72bc21af4a0', this.token)
      .subscribe((res) => {
        this.getedUserWordById = JSON.stringify(res);
        console.log(res);
      });
  }

  updateUserWord() {
    const optional = {
      optionalField: 'close',
      isDeleted: true,
    };
    this.api
      .updateUserWord(
        '60660e296b85e609a078ee2c',
        '5e9f5ee35eb9e72bc21af4a0',
        this.token,
        'hard',
        optional
      )
      .subscribe((res) => {
        this.updatedUserWord = JSON.stringify(res);
        console.log(res);
      });
  }

  deleteUserWord() {
    this.api
      .deleteUserWord('60660e296b85e609a078ee2c', '5e9f5ee35eb9e72bc21af4a0', this.token)
      .subscribe((res) => {
        this.deletedUserWord = JSON.stringify(res);
        console.log(res);
      });
  }

  setUserSettings() {
    const optional = {
      optionalField: 'close',
      isDeleted: false,
    };
    this.api
      .setUserSettings('60660e296b85e609a078ee2c', this.token, 4, optional)
      .subscribe((res) => {
        this.setedUserSettings = JSON.stringify(res);
        console.log(res);
      });
  }
  getUserSettings() {
    this.api
      .getUserSettings('60660e296b85e609a078ee2c', this.token)
      .subscribe((res) => {
        this.getedUserSettings = JSON.stringify(res);
        console.log(res);
      });
  }

  setUserStatistic() {
    const optional = {
      optionalField: 'close',
      isDeleted: false,
    };
    this.api
      .setUserStatistic('60660e296b85e609a078ee2c', this.token, 10, optional)
      .subscribe((res) => {
        this.setedUserStatistic = JSON.stringify(res);
        console.log(res);
      });
  }
  getUserStatistic() {
    const optional = {
      optionalField: 'close',
      isDeleted: false,
    };
    this.api
      .getUserStatistic('60660e296b85e609a078ee2c', this.token)
      .subscribe((res) => {
        this.getedUserStatistic = JSON.stringify(res);
        console.log(res);
      });
  }

  refreshTokenUser() {
    this.api
      .refreshTokenUser('60660e296b85e609a078ee2c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsInRva2VuSWQiOiJkZjA0NDc4Zi02Yjk3LTRkNTItYTNlYS0zYmFhZWZiMjJmYzMiLCJpYXQiOjE2MTc0MDY5MDgsImV4cCI6MTYxNzQyMzEwOH0.pRXSPDWeStGNAb5vAgFD0dUCFQ11OLVGs5QeGozfP-0')
      .subscribe((res) => {
        this.refreshedTokenUser = JSON.stringify(res);
        console.log(res);
      });
  }
}
