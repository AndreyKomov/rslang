import { Component, HostListener, OnInit } from '@angular/core';
import WordsApiServiceComponent from '@app/server/api';

@Component({
  selector: 'app-constructor-game',
  templateUrl: './constructor-game.component.html',
  styleUrls: ['./constructor-game.component.scss'],
})
export class ConstructorGameComponent implements OnInit {
  baseImgUrl = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/';
  isEndRaund = false;
  context = '';
  translateWord = '';
  placeIndex = 0;
  word = '';
  raund = 0;
  letterArr: string[];
  rightLettersArr = [];

  sliceWord(word: string): string[] {
    return word.split('');
  }

  randomiseLetters(letterArr: string[]): string[] {
    return letterArr.sort();
  }

  getReadyForGameWord(word: string): string[] {
    let letterArr = this.sliceWord(word);
    return this.randomiseLetters(letterArr);
  }

  checkLetter(letter: string, index: number, event: Event) {
    if (letter == this.word[this.placeIndex]) {
      this.letterArr.splice(index, 1);
      this.rightLettersArr[this.placeIndex] = letter;
      this.placeIndex++;
      if (this.placeIndex === this.word.length) {
        this.endRaund();
      }
    } else {
      (<HTMLElement>event.target).classList.add('error');
      (<HTMLElement>event.target).classList.remove('ready-letter');
      setTimeout(() => {
        (<HTMLElement>event.target).classList.remove('error');
        (<HTMLElement>event.target).classList.add('ready-letter');
      }, 500);
    }
  }

  constructor(private apiService: WordsApiServiceComponent) {}

  ngOnInit(): void {
    this.nextRaund();
  }

  nextRaund(): void {
    this.isEndRaund = false;
    this.context = '';
    this.translateWord = '';
    this.placeIndex = 0;
    this.word = '';
    this.letterArr = [];
    this.rightLettersArr = [];
    this.apiService.getWordsByPageAndGroup(1, 1).subscribe(data => {
      this.word = data[this.raund].word;
      this.translateWord = data[this.raund].wordTranslate;
      this.context = data[this.raund].textExample;
      this.baseImgUrl += data[this.raund].image;
      for (let i = 0; i < this.word.length; i++) {
        this.rightLettersArr.push('');
      }
      this.letterArr = this.getReadyForGameWord(this.word);
      console.log(data);
    });
  }

  showAnswer(): void {
    for (let i = 0; i < this.word.length; i++) {
      this.rightLettersArr[i] = this.word[i];
    }

    this.placeIndex = this.letterArr.length;

    this.letterArr = [];
    
    this.endRaund();
  }

  @HostListener('window:keydown', ['$event'])
  showAnswerKeydownHandler(event: KeyboardEvent): void {
    event.code === 'Enter' && this.isEndRaund ? this.nextRaund() : this.showAnswer();
  }

  endRaund() {
    this.raund++;
    this.isEndRaund = true;
  }
}
