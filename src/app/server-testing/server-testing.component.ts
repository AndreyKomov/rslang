import { Component, OnInit } from '@angular/core';
import WordApiServiceComponent from '../server/api';

@Component({
  selector: 'app-server-testing',
  templateUrl: './server-testing.component.html',
  styleUrls: ['./server-testing.component.scss'],
})
export default class ServerTestingComponent implements OnInit {
  Data: any | null;

  constructor(public api: WordApiServiceComponent) {}

  ngOnInit() {
    this.api.getWordById('5e9f5ee35eb9e72bc21af4a2').subscribe((data) => {
      this.Data = data.word;
    });
  }
}
