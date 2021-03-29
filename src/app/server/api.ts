import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  template: '',
})
export default class WordsApiServiceComponent implements OnInit {
  apiUrl = 'https://arcane-chamber-21175.herokuapp.com/';

  id: number | null;

  page: number | null;

  group: number | null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getWordById(this.id);
    this.getWordsByPageAndGroup(this.page, this.group);
  }

  private getWordById(id: number | null): void {
    this.id = id;
    const promise = this.httpClient.get(`${this.apiUrl}words/${this.id}`).toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private getWordsByPageAndGroup(page: number | null, group: number | null): void {
    this.page = page;
    this.group = group;
    const promise = this.httpClient
      .get(`${this.apiUrl}words?page=${page}&group=${group}`)
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }
}
