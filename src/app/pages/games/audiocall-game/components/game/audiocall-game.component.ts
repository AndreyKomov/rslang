import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import WordsApiServiceComponent from '@app/server/api';
import { AudiocallService } from '../../audiocall.service';

@Component({
  selector: 'app-audiocall-game',
  templateUrl: './audiocall-game.component.html',
  styleUrls: ['./audiocall-game.component.scss'],
})
export class AudiocallGameComponent implements OnInit {
  group: number;
  page: number;
  requestMediaUrl = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/';
  wordsFromApi: any[] = [];
  currentWords: any[] = [];
  wordsQuantityInRound = 5;
  currentLastWordInRound = 0;
  askedWordIndex = 0;
  media = {};
  wordSoundUrl = '';
  askedWordSound = new Audio(`${this.requestMediaUrl}${this.wordSoundUrl}`);
  // qq = new Audio('https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/files/02_0624.mp3');
  correctStyle = false;
  active = false;

  constructor(
    private route: ActivatedRoute,
    private backEndService: WordsApiServiceComponent,
    private gameService: AudiocallService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.group = param.group;
      this.page = param.page;
      this.getWordsFromBE();
    });
  }

  getWordsFromBE() {
    this.backEndService.getWordsByPageAndGroup(this.page, this.group).subscribe((data) => {
      this.wordsFromApi = data;
      this.buildWordsArrayForGameRound();
      this.getRandomWord(this.currentWords.length);
    });
  }

  buildWordsArrayForGameRound() {
    this.currentWords = this.wordsFromApi.slice(
      this.currentLastWordInRound,
      this.currentLastWordInRound + this.wordsQuantityInRound
    );
  }

  getRandomWord(max) {
    this.askedWordIndex = Math.floor(Math.random() * max);
  }

  getSound() {
    const wordSoundUrl = this.currentWords[this.askedWordIndex].audio;
    const askedWordSound = new Audio(`${this.requestMediaUrl}${wordSoundUrl}`);
    return askedWordSound;
  }

  checkWord(word) {
    if (this.currentWords[this.askedWordIndex].id === word.id) {
      this.gameService.playSound(this.gameService.correct);
      this.correctStyle = true;
      this.active = true;
    } else {
      this.gameService.playSound(this.gameService.error);
    }
  }

  repeatSound() {
    /*     const wordSoundUrl = this.currentWords[this.askedWordIndex].audio;
      const askedWordSound = new Audio(`${this.requestMediaUrl}${wordSoundUrl}`);
      askedWordSound.play(); */
    this.getSound().play();
  }
}
