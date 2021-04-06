import { Injectable } from '@angular/core';
import { URL_FILES } from '@app/core/common/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICardInfo } from './word';

@Injectable({
  providedIn: 'root',
})
export default class ElectronicTextbookService {
  private audioObj = new Audio();
  private group = 0;
  private page = 0;

  private cardInfoSource = new BehaviorSubject<ICardInfo>({
    isTextExampleTranslate: true,
    isWordTranslate: true,
    isButtonDelete: true,
    isButtonAdd: true,
  });

  public cardInfo = this.cardInfoSource.asObservable();

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

  playAudio(url: string): void {
    this.audioObj.src = `${URL_FILES + url}`;
    this.audioObj.load();
    /* this.audioObj.addEventListener('ended', callback, false); */
    this.audioObj.play();
  }
}
