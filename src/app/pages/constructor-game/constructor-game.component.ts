import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-constructor-game',
  templateUrl: './constructor-game.component.html',
  styleUrls: ['./constructor-game.component.scss'],
})
export class ConstructorGameComponent implements OnInit {
  translateWord = 'Машина';
  placeIndex = 0;
  word = 'car';

  letterArr: string[];

  rightLettersArr = [
    {
      letter: '',
      isRight: false,
    },
    {
      letter: '',
      isRight: false,
    },
    {
      letter: '',
      isRight: false,
    },
  ];

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
      this.rightLettersArr[this.placeIndex].letter = letter;
      this.rightLettersArr[this.placeIndex].isRight = true;
      console.log(this.rightLettersArr);
      this.placeIndex++;
    } else {
      (<HTMLElement>event.target).classList.add('error');
      (<HTMLElement>event.target).classList.remove('ready-letter');
      setTimeout(() => {
        (<HTMLElement>event.target).classList.remove('error');
        (<HTMLElement>event.target).classList.add('ready-letter');
      }, 500);
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.letterArr = this.getReadyForGameWord(this.word);
  }

  showAnswer(): void {
    for (let i = 0; i < this.word.length; i++) {
      this.rightLettersArr[i].letter = this.word[i];
      this.rightLettersArr[i].isRight = true;
    }

    this.placeIndex = this.letterArr.length;

    this.letterArr = [];
  }

  @HostListener('window:keydown', ['$event'])
  showAnswerKeydownHandler(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.showAnswer();
    }
  }
}
