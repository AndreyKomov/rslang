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

  createUserWord: string | null;

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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsImlhdCI6MTYxNzMwMjk4NiwiZXhwIjoxNjE3MzE3Mzg2fQ.GCzIFUJ2rJV8y2Nn_jFvk_sGkDt0cLgUtRR59X3hdZU'
      )
      .subscribe((data) => {
        this.getUser = JSON.stringify(data);
      });
  }

  createUser() {
    this.api
      .createUser('vitali', 'vit1678461@mail.ru', 'Vit1767812++', this.selectedFile)
      .subscribe((res) => {
        console.log('User: ', res);
      });
  }

  updateUser() {
    this.api
      .updateUser(
        '60660e296b85e609a078ee2c',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjYwZTI5NmI4NWU2MDlhMDc4ZWUyYyIsImlhdCI6MTYxNzMwMjk4NiwiZXhwIjoxNjE3MzE3Mzg2fQ.GCzIFUJ2rJV8y2Nn_jFvk_sGkDt0cLgUtRR59X3hdZU',
        'vitali',
        'vit1678468@mail.ru',
        'Vit1767812++',
        this.selectedFile
      )
      .subscribe((res) => {
        console.log('User: ', res);
      });
  }
}
