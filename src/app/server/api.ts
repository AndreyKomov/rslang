import { OnInit, Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

interface OptionalObject {
  difficulty: string | null;
  isDeleted: string | null;
}
@Injectable()
@Component({
  template: '',
})
export default class WordsApiServiceComponent implements OnInit {
  private apiUrl = 'https://arcane-chamber-21175.herokuapp.com/';

  id: string | null;

  page: number | null;

  group: number | null;

  userName: string | null;

  email: string | null;

  password: string | null;

  token: string | null;

  wordId: string | null;

  wordDifficulty: string | null;

  optionalObject: OptionalObject[] | null;

  wordsPerDay: number | null;

  learnedWords: number | null;

  refreshToken: string | null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getWordById(this.wordId);
    this.getWordsByPageAndGroup(this.page, this.group);
    this.createUser(this.userName, this.email, this.password);
    this.getUser(this.id, this.token);
    this.updateUser(this.id, this.token, this.userName, this.email, this.password);
    this.deleteUser(this.id, this.token);
    this.getAllUsersWords(this.id, this.token);
    this.getUserWordById(this.id, this.wordId, this.token);
    this.updateUserWord(this.id, this.wordId, this.token, this.wordDifficulty, this.optionalObject);
    this.createUserWord(this.id, this.wordId, this.token, this.wordDifficulty, this.optionalObject);
    this.deleteUserWord(this.id, this.wordId, this.token);
    this.getUserSettings(this.id, this.token);
    this.setUserSettings(this.id, this.token, this.wordsPerDay, this.optionalObject);
    this.getUserStatistic(this.id, this.token);
    this.setUserStatistic(this.id, this.token, this.learnedWords, this.optionalObject);
    this.signIn(this.email, this.password);
    this.refreshTokenUser(this.id, this.refreshToken);
  }

  public getWordById(wordId: string | null): Observable<any> {
    this.wordId = wordId;
    return this.httpClient.get<any>(`${this.apiUrl}words/${this.wordId}`);
  }

  public getWordsByPageAndGroup(page: number | null, group: number | null): void {
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

  public createUser(userName: string | null, email: string | null, password: string | null): void {
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

  public getUser(id: string | null, token: string | null): void {
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

  public updateUser(
    id: string | null,
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

  public deleteUser(id: string | null, token: string | null): void {
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

  public getAllUsersWords(id: string | null, token: string | null): void {
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

  public getUserWordById(id: string | null, wordId: string | null, token: string | null): void {
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

  public updateUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null,
    wordDifficulty: string | null,
    optionalObject: OptionalObject[] | null
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

  public createUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null,
    wordDifficulty: string | null,
    optionalObject: OptionalObject[] | null
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

  public deleteUserWord(id: string | null, wordId: string | null, token: string | null): void {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    const promise = this.httpClient
      .delete(`${this.apiUrl}users/${id}/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
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

  public getUserSettings(id: string | null, token: string | null): void {
    this.id = id;
    this.token = token;
    const promise = this.httpClient
      .delete(`${this.apiUrl}users/${id}/settings`, {
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

  public setUserSettings(
    id: string | null,
    token: string | null,
    wordsPerDay: number | null,
    optionalObject: OptionalObject[] | null
  ): void {
    this.id = id;
    this.token = token;
    this.wordsPerDay = wordsPerDay;
    this.optionalObject = optionalObject;
    const promise = this.httpClient
      .put(`${this.apiUrl}users/${id}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wordsPerDay,
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

  public getUserStatistic(id: string | null, token: string | null): void {
    this.id = id;
    this.token = token;
    const promise = this.httpClient
      .get(`${this.apiUrl}users/${id}/statistics`, {
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

  public setUserStatistic(
    id: string | null,
    token: string | null,
    learnedWords: number | null,
    optionalObject: OptionalObject[] | null
  ): void {
    this.id = id;
    this.token = token;
    this.learnedWords = learnedWords;
    this.optionalObject = optionalObject;
    const promise = this.httpClient
      .put(`${this.apiUrl}users/${id}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          learnedWords,
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

  public signIn(email: string | null, password: string | null): void {
    this.email = email;
    this.password = password;
    const promise = this.httpClient
      .post(`${this.apiUrl}signin`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

  public refreshTokenUser(id: string | null, refreshToken: string | null): void {
    this.id = id;
    this.refreshToken = refreshToken;
    const promise = this.httpClient
      .get(`${this.apiUrl}users/${id}/tokens`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          Accept: 'application/json',
        },
      })
      .toPromise();
    promise
      .then((data) => {
        localStorage.setItem('token', this.token);
        localStorage.setItem('refreshToken', refreshToken);
        return JSON.stringify(data);
      })
      .catch((error) => {
        localStorage.setItem('userId', null);
        localStorage.setItem('token', null);
        localStorage.setItem('userName', null);
        localStorage.setItem('email', null);
        localStorage.setItem('authorized', 'false');
        localStorage.setItem('wordsPerDay', null);
        localStorage.setItem('userCardsCount', null);
        localStorage.setItem('userLevel', null);
        localStorage.setItem('userSetExample', null);
        localStorage.setItem('userSetExplanation', null);
        localStorage.setItem('userSetImage', null);
        localStorage.setItem('userSetTranscription', null);
        localStorage.setItem('userSetTranslate', null);
        localStorage.setItem('refreshToken', null);
        localStorage.setItem('mainDailyStatistic', null);
        return JSON.stringify(error);
      });
  }
}
