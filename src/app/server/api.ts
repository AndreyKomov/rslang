import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface optionalObject {
  option1: string | null;
  option2: number | null;
}
@Component({
  template: '',
})
export default class WordsApiServiceComponent implements OnInit {
  apiUrl = 'https://arcane-chamber-21175.herokuapp.com/';

  id: number | null;

  page: number | null;

  group: number | null;

  userName: string | null;

  email: string | null;

  password: string | null;

  token: string | null;

  wordId: number | null;

  wordDifficulty: string | null;

  optionalObject: optionalObject[] | null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getWordById(this.id);
    this.getWordsByPageAndGroup(this.page, this.group);
    this.createUser(this.userName, this.email, this.password);
    this.getUser(this.id, this.token);
    this.updateUser(this.id, this.token, this.userName, this.email, this.password);
    this.deleteUser(this.id, this.token);
    this.getAllUsersWords(this.id, this.token);
    this.getUserWordById(this.id, this.wordId, this.token);
    this.updateUserWord(this.id, this.wordId, this.token, this.wordDifficulty, this.optionalObject);
    this.createUserWord(this.id, this.wordId, this.token, this.wordDifficulty, this.optionalObject);
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

  private createUser(userName: string | null, email: string | null, password: string | null): void {
    this.userName = userName;
    this.email = email;
    this.password = password;
    const promise = this.httpClient
      .post(`${this.apiUrl}users`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'form/multipart',
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private getUser(id: number | null, token: string | null): void {
    this.id = id;
    this.token = token;
    const promise = this.httpClient
      .get(`${this.apiUrl}users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private updateUser(
    id: number | null,
    token: string | null,
    userName: string | null,
    email: string | null,
    password: string | null
  ): void {
    this.id = id;
    this.token = token;
    this.userName = userName;
    this.email = email;
    this.password = password;
    const promise = this.httpClient
      .put(`${this.apiUrl}users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email: `${email}`,
          password: `${password}`,
        }),
      })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private deleteUser(id: number | null, token: string | null): void {
    this.id = id;
    this.token = token;
    const promise = this.httpClient
      .delete(`${this.apiUrl}users/${id}`, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private getAllUsersWords(id: number | null, token: string | null): void {
    this.id = id;
    this.token = token;
    const promise = this.httpClient
      .get(`${this.apiUrl}users/${id}/words`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private getUserWordById(id: number | null, wordId: number | null, token: string | null): void {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    const promise = this.httpClient
      .get(`${this.apiUrl}users/${id}/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private updateUserWord(
    id: number | null,
    wordId: number | null,
    token: string | null,
    wordDifficulty: string | null,
    optionalObject: optionalObject[] | null
  ): void {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    this.wordDifficulty = wordDifficulty;
    this.optionalObject = optionalObject;
    const promise = this.httpClient
      .put(`${this.apiUrl}users/${id}/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty: `${wordDifficulty}`,
          optionalObject,
        }),
      })
      .toPromise();
    promise
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        return JSON.stringify(error);
      });
  }

  private createUserWord(
    id: number | null,
    wordId: number | null,
    token: string | null,
    wordDifficulty: string | null,
    optionalObject: optionalObject[] | null
  ): void {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    this.wordDifficulty = wordDifficulty;
    this.optionalObject = optionalObject;
    const promise = this.httpClient
      .put(`${this.apiUrl}users/${id}/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty: `${wordDifficulty}`,
          optionalObject,
        }),
      })
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
