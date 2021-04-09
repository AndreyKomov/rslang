import { Component, Directive, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import WordsApiServiceComponent from '@app/server/api';

@Component({
  selector: 'app-constructor-game',
  templateUrl: './constructor-game.component.html',
  styleUrls: ['./constructor-game.component.scss'],
})
export class ConstructorGameComponent implements OnInit {
  isMistake = false;
  @ViewChild('keysBlock') keysBlock;
  isUserDoMistake = false;
  rightAnswers = 10;
  wrongAnswers = 0;
  showResult = false;
  isLevelChosen = false;
  page = 0;
  selectedGroup: number = 0;
  selectedPage: number = 0;
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
      if (this.raund > 10) {
        this.word = '';
        this.raund = 0;
        this.showResult = true;
      }
    } else {
      this.isUserDoMistake = true;
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
  }

  nextRaund(): void {
    this.isUserDoMistake = false;
    this.baseImgUrl = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/';
    this.isLevelChosen = true;
    this.isEndRaund = false;
    this.context = '';
    this.translateWord = '';
    this.placeIndex = 0;
    this.word = '';
    this.letterArr = [];
    this.rightLettersArr = [];
    this.apiService.getWordsByPageAndGroup(this.page, this.selectedGroup).subscribe(data => {
      this.word = data[this.raund].word;
      this.translateWord = data[this.raund].wordTranslate;
      this.context = data[this.raund].textExample;
      this.baseImgUrl += data[this.raund].image;
      for (let i = 0; i < this.word.length; i++) {
        this.rightLettersArr.push('');
      }
      this.letterArr = this.getReadyForGameWord(this.word);
    });
  }

  showAnswer(): void {
    for (let i = 0; i < this.word.length; i++) {
      this.rightLettersArr[i] = this.word[i];
    }

    this.placeIndex = this.letterArr.length;

    this.letterArr = [];

    this.isUserDoMistake = true;
    
    this.endRaund();

    if (this.raund > 10) {
      this.word = '';
      this.raund = 0;
      this.showResult = true;
      this.rightAnswers++;
      this.wrongAnswers--;
    }
  }

  @HostListener('window:keydown', ['$event'])
  keysHandler(event): void {
    if (event.code === 'Enter' && this.isEndRaund) {
      this.nextRaund();
    } else if (event.code === 'Enter' && !this.isEndRaund && !this.showResult) {
      this.showAnswer();
    }
    if (event.key === this.word[this.placeIndex]) {
      this.letterArr.splice(this.letterArr.indexOf(this.word[this.placeIndex]), 1);
      this.rightLettersArr[this.placeIndex] = this.word[this.placeIndex];
      this.placeIndex++;
      if (this.placeIndex === this.word.length) {
        this.endRaund();
      }
      if (this.raund > 10) {
        this.word = '';
        this.raund = 0;
        this.showResult = true;
      }
    } 
    else if (event.key !== this.word[this.placeIndex]) {
      this.isUserDoMistake = true;
      for (let i = 0; i < this.keysBlock.nativeElement.children.length; i++) {
          this.isMistake = true;
      setTimeout(() => {
        this.isMistake = false;
      }, 500);
        }
      
      
    }
  }

  endRaund(): void {
    this.raund++;
    this.isEndRaund = true;
    if (this.isUserDoMistake) {
      console.log(this.rightAnswers, this.wrongAnswers);
      this.rightAnswers--;
      this.wrongAnswers++;
    }
    if (this.page != 30) {
      this.page++;
    } else {
      alert('Вы прошли все слова группы!');
      location.reload();
    }
  }

  continueGame(): void {
    this.showResult = false;
    this.rightAnswers = 10;
    this.wrongAnswers = 0;
    this.nextRaund();
  }

  reload(): void {
    location.reload();
  }

  onChangeGroup(selected): void {
    this.selectedGroup = Number(selected) - 1;
  }

  onChangePage(selected): void {
    this.selectedPage = Number(selected);
    this.page = this.selectedPage;
  }
}
