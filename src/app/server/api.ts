import { Component, Injectable } from '@angular/core';
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
export default class WordsApiServiceComponent {
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

  public getWordById(wordId: string | null): Observable<any> {
    this.wordId = wordId;
    return this.httpClient.get<any>(`${this.apiUrl}words/${this.wordId}`);
  }

  public getWordsByPageAndGroup(page: number | null, group: number | null): Observable<any> {
    this.page = page;
    this.group = group;
    return this.httpClient.get<any>(`${this.apiUrl}words?page=${page}&group=${group}`);
  }

  public createUser(
    userName: string | null,
    email: string | null,
    password: string | null
  ): Observable<any> {
    this.userName = userName;
    this.email = email;
    this.password = password;
    return this.httpClient.post<any>(`${this.apiUrl}users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'form/multipart',
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    });
  }

  public getUser(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public updateUser(
    id: string | null,
    token: string | null,
    userName: string | null,
    email: string | null,
    password: string | null
  ): Observable<any> {
    this.id = id;
    this.token = token;
    this.userName = userName;
    this.email = email;
    this.password = password;
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}`, {
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
    });
  }

  public deleteUser(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.delete<any>(`${this.apiUrl}users/${id}`, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public createUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null,
    wordDifficulty: string | null,
    optionalObject: OptionalObject[] | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    this.wordDifficulty = wordDifficulty;
    this.optionalObject = optionalObject;
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty: `${wordDifficulty}`,
        optionalObject,
      }),
    });
  }

  public getAllUsersWords(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public getUserWordById(
    id: string | null,
    wordId: string | null,
    token: string | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/words/${wordId}`);
  }

  public updateUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null,
    wordDifficulty: string | null,
    optionalObject: OptionalObject[] | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    this.wordDifficulty = wordDifficulty;
    this.optionalObject = optionalObject;
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty: `${wordDifficulty}`,
        optionalObject,
      }),
    });
  }

  public deleteUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    return this.httpClient.delete<any>(`${this.apiUrl}users/${id}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      },
    });
  }

  public getUserSettings(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public setUserSettings(
    id: string | null,
    token: string | null,
    wordsPerDay: number | null,
    optionalObject: OptionalObject[] | null
  ): Observable<any> {
    this.id = id;
    this.token = token;
    this.wordsPerDay = wordsPerDay;
    this.optionalObject = optionalObject;
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wordsPerDay,
        optionalObject,
      }),
    });
  }

  public getUserStatistic(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public setUserStatistic(
    id: string | null,
    token: string | null,
    learnedWords: number | null,
    optionalObject: OptionalObject[] | null
  ): Observable<any> {
    this.id = id;
    this.token = token;
    this.learnedWords = learnedWords;
    this.optionalObject = optionalObject;
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        learnedWords,
        optionalObject,
      }),
    });
  }

  public signIn(email: string | null, password: string | null): Observable<any> {
    this.email = email;
    this.password = password;
    return this.httpClient.post<any>(`${this.apiUrl}signin`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });
  }

  public refreshTokenUser(id: string | null, refreshToken: string | null): Observable<any> {
    this.id = id;
    this.refreshToken = refreshToken;
    localStorage.setItem('token', this.token);
    localStorage.setItem('refreshToken', refreshToken);
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/tokens`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
      },
    });
  }
}
