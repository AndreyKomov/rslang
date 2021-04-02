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

  getUserWordById: string | null;

  getWordsByPageAndGroup: string | null;

  selectedFile: File = null;

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
    this.api
      .getUser(
        '60660e296b85e609a078ee2c',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsImlhdCI6MTYxNzM4Njc1OSwiZXhwIjoxNjE3NDAxMTU5fQ.mFdIB2T8u0PWlyKP1oO1kgN8e_TWUo65qSnhjjDGmMU'
      )
      .subscribe((data) => {
        this.getUser = JSON.stringify(data);
      });
  }

  createUser() {
    this.api
      .createUser('vitalik', 'vitg54@mail.ru', 'Vit1767812++', this.selectedFile)
      .subscribe((res) => {
        console.log(res);
      });
  }

  updateUser() {
    this.api
      .updateUser(
        '60660e296b85e609a078ee2c',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsImlhdCI6MTYxNzM3MDUwMiwiZXhwIjoxNjE3Mzg0OTAyfQ.xmW47UQ-ST266Yb57r3i7oTGkzq0gi9NdX0BItqb28M',
        'vitali',
        'vit1678465@mail.ru',
        'Vit1767812++',
        this.selectedFile
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  signIn() {
    this.api.signIn('vit1678465@mail.ru', 'Vit1767812++').subscribe((res) => {
      console.log('signIn: ', res);
    });
  }

  createUserWord() {
    this.api
      .createUserWord('60660e296b85e609a078ee2c', '5e9f5ee35eb9e72bc21af4a0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsImlhdCI6MTYxNzM4Njc1OSwiZXhwIjoxNjE3NDAxMTU5fQ.mFdIB2T8u0PWlyKP1oO1kgN8e_TWUo65qSnhjjDGmMU', 'weak', null)
      .subscribe((res) => {
        this.createdUserWord = JSON.stringify(res);
        console.log(res);
      });
  }
}
