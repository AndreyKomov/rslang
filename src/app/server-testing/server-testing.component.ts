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

  constructor(public api: WordApiServiceComponent) {}

  ngOnInit() {
    this.api.getWordById('5e9f5ee35eb9e72bc21af4a2').subscribe((data) => {
      this.wordById = data.word;
    });
    this.api.getWordsByPageAndGroup(0, 0).subscribe((data) => {
      this.getWordsByPageAndGroup = JSON.stringify(data);
    });
  }
}
