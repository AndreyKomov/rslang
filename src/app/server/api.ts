import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export default class WordsApiService implements OnInit {
  name = 'WordsApiService';

  apiUrl = 'https://arcane-chamber-21175.herokuapp.com/';

  id: number | null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
   this.getWordById(this.id);
  }

  private getWordById(id) {
    this.id = id;
    const promise = this.httpClient.get(`${this.apiUrl}words/${this.id}`).toPromise();
    console.log(promise);
    promise
      .then((data) => {
        return console.log(`Promise resolved with: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        return console.log(`Promise rejected with ${JSON.stringify(error)}`);
      });
  }
}
