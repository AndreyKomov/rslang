import { Component, OnInit } from '@angular/core';
import WordApiServiceComponent from '../server/api';

@Component({
  selector: 'app-server-testing',
  templateUrl: './server-testing.component.html',
  styleUrls: ['./server-testing.component.scss'],
})
export default class ServerTestingComponent implements OnInit {
  Data: string | null;

  constructor(private api: WordApiServiceComponent) {}

  ngOnInit(): void {
    this.Data = 'gljkulk';
    // this.api.getWordById('5e8aaaf87c3d1d199c0f2d6f');
  }
}
