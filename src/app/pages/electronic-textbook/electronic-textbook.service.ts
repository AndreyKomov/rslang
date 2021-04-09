import { Injectable, Optional } from '@angular/core';
import { URL_FILES } from '@app/core/common/constants';
import WordsApiServiceComponent from '@app/server/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICardInfo, IUserInfo, IUserWord, IWord } from './word';

@Injectable()
export default class ElectronicTextbookService {
  private audioObj = new Audio();
  private group = 0;
  private page = 0;
  private colors = ['#a29bfe', '#f53b57', '#fd79a8', '#55efc4', '#ffeaa7', '#b2bec3'];
  private wordsSource = new BehaviorSubject<IWord[]>([]);

  public words = this.wordsSource.asObservable();

  isPlay = true;
  userData: IUserInfo;
  categoryWords: IWord[];
  userWords: IUserWord[] = [
    {
      id: '6070380bf44de700150e86f0',
      difficulty: 'hard',
      optional: { date: 1617967120405, repeat: 0, delete: false },
      wordId: '5e9f5ee35eb9e72bc21af4a0',
    },
    {
      id: '607038bdf44de700150e86f1',
      difficulty: 'hard',
      optional: { date: 1617967298971, repeat: 0, delete: false },
      wordId: '5e9f5ee35eb9e72bc21af4a2',
    },
    {
      id: '607038c0f44de700150e86f2',
      difficulty: 'hard',
      optional: { date: 1617967301770, repeat: 0, delete: false },
      wordId: '5e9f5ee35eb9e72bc21af4a3',
    },
    {
      id: '607038c3f44de700150e86f3',
      difficulty: 'hard',
      optional: { date: 1617967304258, repeat: 0, delete: false },
      wordId: '5e9f5ee35eb9e72bc21af4a1',
    },
    {
      id: '607038d8f44de700150e86f6',
      difficulty: 'hard',
      optional: { date: 1617967325819, repeat: 0, delete: false },
      wordId: '5e9f5ee35eb9e72bc21af4a7',
    },
  ];

  private cardInfoSource = new BehaviorSubject<ICardInfo>({
    isTextExampleTranslate: true,
    isWordTranslate: true,
    isButtonDelete: true,
    isButtonAdd: true,
  });

  public cardInfo = this.cardInfoSource.asObservable();

  constructor(private api: WordsApiServiceComponent) {
    this.api.signIn('cupora@tut.by', 'Cupora1985').subscribe((data: IUserInfo) => {
      this.userData = data;
      this.getUserWords();
    });
  }

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

  getWordsPageAndGroup(): Observable<IWord[]> {
    return this.api.getWordsByPageAndGroup(this.page, this.group).pipe(
      tap((data: IWord[]) => {
        const array = data.map((word) => {
          const findWord = this.userWords.find((userWord) => userWord.wordId === word.id);
          return findWord ? { ...word, userWord: findWord } : word;
        });
        this.wordsSource.next(array);
      })
    );
  }

  getUserWords(): void {
    this.api.getAllUsersWords(this.userData.userId, this.userData.token).pipe(
      tap((data: IUserWord[]) => {
        this.userWords = data;
      })
    );
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
