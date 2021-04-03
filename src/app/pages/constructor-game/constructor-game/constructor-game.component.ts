import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-constructor-game',
  templateUrl: './constructor-game.component.html',
  styleUrls: ['./constructor-game.component.scss'],
})
export class ConstructorGameComponent implements OnInit {
  placeIndex = 0;
  word = 'car';

  letterArr: String[];

  rightLettersArr: String[] = [];

  sliceWord(word: string): String[] {
    return word.split('');
  }

  randomiseLetters(letterArr: String[]): String[] {
    return letterArr.sort();
  }

  getReadyForGameWord(word: string): String[] {
    let letterArr = this.sliceWord(word);
    return this.randomiseLetters(letterArr);
  }

  checkLetter(letter: string, index: number, event: Event) {
    console.log(letter);
    if (letter == this.word[this.placeIndex]) {
      this.placeIndex++;
      this.letterArr.splice(index, 1);
      this.rightLettersArr.push(letter);
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
}
