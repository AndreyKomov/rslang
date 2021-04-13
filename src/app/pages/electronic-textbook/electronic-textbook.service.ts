import { Injectable, Optional } from '@angular/core';
import { URL_FILES } from '@app/core/common/constants';
import { WordsApiService } from '@app/server/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICardInfo, IUserInfo, IUserWord, IWord } from './word';

@Injectable({ providedIn: 'root' })
export class ElectronicTextbookService {
  private audioObj = new Audio();
  private group = 0;
  private page = 0;
  private colors = ['#a29bfe', '#f53b57', '#fd79a8', '#55efc4', '#ffeaa7', '#b2bec3'];
  private wordsSource = new BehaviorSubject<IWord[]>([]);

  public words = this.wordsSource.asObservable();

  isPlay = true;
  userData: IUserInfo;
  categoryWords: IWord[] = [];
  userWords: IUserWord[] = [];

  private cardInfoSource = new BehaviorSubject<ICardInfo>({
    isTextExampleTranslate: true,
    isWordTranslate: true,
    isButtonDelete: true,
    isButtonAdd: true,
  });

  public cardInfo = this.cardInfoSource.asObservable();

  constructor(private api: WordsApiService) {}

  get groups(): number {
    return this.group;
  }

  set groups(value: number) {
    this.group = value;
  }

  public get pages(): number {
    return this.page;
  }

  public set pages(value: number) {
    this.page = value;
  }

  getCardInfo = (): Observable<ICardInfo> => this.cardInfo;

  setCardInfo(obj: ICardInfo): void {
    this.cardInfoSource.next({ ...obj });
  }

  playAudio(url: string[]): void {
    this.isPlay = false;
    let song = 0;
    this.audioObj.addEventListener('ended', () => {
      song += 1;
      song = song < url.length ? song : 0;
      if (song !== 0) {
        this.audioObj.src = `${URL_FILES + url[song]}`;
        this.audioObj.load();
        this.audioObj.play();
      } else {
        this.isPlay = true;
      }
    });
    this.audioObj.src = `${URL_FILES + url[song]}`;
    this.audioObj.play();
  }

  getColor(index: number): string {
    return this.colors[index];
  }

  getWords(): Observable<IWord[]> {
    return this.words;
  }

  getWordsPageAndGroup(): void {
    this.api.getWordsByPageAndGroup(this.page, this.group).subscribe((data: IWord[]) => {
      const array = data.map((word) => {
        const findWord = this.userWords.find((userWord) => userWord.wordId === word.id);
        return findWord ? { ...word, userWord: findWord } : word;
      });
      this.wordsSource.next(array);
    });
  }

  getUserWords(userId: string, token: string): void {
    this.userData = { userId, token };
    this.api
      .getAllUsersWords(this.userData.userId, this.userData.token)
      .subscribe((data: IUserWord[]) => {
        this.userWords = data;
      });
  }

  getUserSettings(): void {
    this.api
      .getUserSettings(this.userData.userId, this.userData.token)
      .subscribe((data: IUserWord[]) => {
        this.userWords = data;
      });
  }

  setUserSettings(option: Optional): void {
    this.api
      .setUserSettings(this.userData.userId, this.userData.token, 4, option)
      .subscribe((data: IUserWord[]) => {
        this.userWords = data;
      });
  }

  addUserWord(wordId: string, wordDifficulty: string, optional: Optional): void {
    this.api
      .createUserWord(this.userData.userId, wordId, this.userData.token, wordDifficulty, optional)
      .subscribe((data: IUserWord) => {
        this.userWords = [...this.userWords, data];
        const newArrayWord = this.wordsSource
          .getValue()
          .map((word) => (word.id === data.wordId ? { ...word, userWord: data } : word));
        this.wordsSource.next(newArrayWord);
      });
  }

  updateUserWord(wordId: string, wordDifficulty: string, optional: Optional): void {
    this.api
      .updateUserWord(this.userData.userId, wordId, this.userData.token, wordDifficulty, optional)
      .subscribe((data: IUserWord) => {
        this.userWords = this.userWords.map((word) => (word.id === data.wordId ? data : word));
        const newArrayWord = this.wordsSource
          .getValue()
          .map((word) => (word.id === data.wordId ? { ...word, userWord: data } : word));
        this.wordsSource.next(newArrayWord);
      });
  }
}
