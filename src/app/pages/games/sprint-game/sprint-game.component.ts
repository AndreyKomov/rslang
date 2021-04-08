import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import WordApiServiceComponent from '../../../server/api';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent {
  display = false;
  displayStatistics = false;
  level = 0;
  round = 0;
  wordsList: object | null;
  words: object | null;
  translations: object | null;
  index = 0;
  wordsYouKnowQuantity = 0;
  wordsYouDontKnowQuantity = 0;
  rightWords = [];
  wrongWords = [];
  isCheckedWord: object | null;
  audioTimerSound = new Audio();
  AudioWrongAnswer = new Audio();
  AudioRightAnswer = new Audio();
  endOGameSound = new Audio();
  isSoundOn = true;
  hiddenScore = true;
  timeLeft = 60;
  interval;
  subscribeTimer: any;
  hiddenScoreBlock: boolean | null;
  hiddenScoreClass: string | null;
  riseScoreQuantity: boolean;
  describeWordBlockTranslation: string | null;
  describeWordBlockSound: string | null;
  describeWordBlockImage: string | null;
  describeWordBlockId: string | null;
  describeWordBlockTranscription: string | null;
  describeWordBlockTextExample: string | null;
  chosenWordCardClass: string | null;
  closeWordCardButtonClass: string | null;

  constructor(public api: WordApiServiceComponent, private cdr: ChangeDetectorRef) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.checkWordTranslationMatch(false);
      this.timeLeft = 60;
      this.delayedHide();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.checkWordTranslationMatch(true);
      this.timeLeft = 60;
      this.delayedHide();
    }
  }

  playAudioTimer() {
    if (this.isSoundOn) {
      this.audioTimerSound.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_timer.mp3?raw=true`;
      this.audioTimerSound.load();
      this.audioTimerSound.play();
    }
  }

  pauseAudioTimer() {
    this.audioTimerSound.pause();
  }

  playAudioWrongAnswer() {
    if (this.isSoundOn) {
      this.AudioWrongAnswer.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_error.mp3?raw=true`;
      this.AudioWrongAnswer.load();
      this.AudioWrongAnswer.play();
    }
  }

  pauseAudioWrongAnswer() {
    this.AudioWrongAnswer.pause();
  }

  playAudioRightAnswer() {
    if (this.isSoundOn) {
      this.AudioRightAnswer.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_correct%20.mp3?raw=true`;
      this.AudioRightAnswer.load();
      this.AudioRightAnswer.play();
    }
  }

  pauseAudioRightAnswer() {
    this.AudioRightAnswer.pause();
  }

  playAudioEndOfGame() {
    if (this.isSoundOn) {
      this.endOGameSound.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_end_of_game.mp3?raw=true`;
      this.endOGameSound.load();
      this.endOGameSound.play();
    }
  }

  pauseAudioEndOfGame() {
    this.endOGameSound.pause();
  }

  update() {
    this.display = !this.display;
    if (this.isSoundOn) {
      this.playAudioTimer();
    }
  }

  updateStatistics() {
    this.displayStatistics = !this.displayStatistics;
    this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
      this.wordsList = data;
      this.words = this.createWordsArray(this.wordsList);
      this.words = this.shuffle(this.words);
      this.translations = this.createTranscriptionArray(this.wordsList);
      this.translations = this.shuffle(this.translations);
    });
  }

  shuffle(array) {
    return array.sort(() => {
      return 0.5 - Math.random();
    });
  }

  onLevelChange(level) {
    this.level = Number(level) - 1;
    this.getWords();
  }

  onRoundChange(round) {
    this.round = Number(round) - 1;
    this.getWords();
  }

  createWordsArray = (wordsList) => wordsList.map((item) => item.word);
  createTranscriptionArray = (wordsList) => wordsList.map((item) => item.wordTranslate);

  getWords() {
    if (this.isSoundOn) {
      this.playAudioTimer();
    }
    this.rightWords = [];
    this.wrongWords = [];
    this.wordsYouKnowQuantity = 0;
    this.wordsYouDontKnowQuantity = 0;
    this.wordsList = [];
    this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
      this.wordsList = data;
      this.words = this.createWordsArray(this.wordsList);
      this.words = this.shuffle(this.words);
      this.translations = this.createTranscriptionArray(this.wordsList);
      this.translations = this.shuffle(this.translations);
    });
  }

  checkWordTranslationMatch(checkPair) {
    const matchWordCheck = this.words[this.index];
    const matchTranslationCheck = this.translations[this.index];
    let result;
    for (const prop in this.wordsList) {
      if (
        this.wordsList[prop].word === matchWordCheck &&
        this.wordsList[prop].wordTranslate === matchTranslationCheck
      ) {
        result = true;
      } else {
        result = false;
      }
    }
    if (checkPair === result) {
      this.wordsYouKnowQuantity += 1;
      this.riseScoreQuantity = true;
      if (this.isSoundOn) {
        this.playAudioRightAnswer();
      }
      this.rightWords.push(this.words[this.index]);
    }
    if (checkPair !== result) {
      this.wordsYouDontKnowQuantity += 1;
      this.riseScoreQuantity = false;
      if (this.isSoundOn) {
        this.playAudioWrongAnswer();
      }
      this.wrongWords.push(this.words[this.index]);
    }
    this.index += 1;
    if (this.index > 19) {
      this.pauseTimer();
      this.pauseAudioTimer();
      this.playAudioEndOfGame();
      this.stopTimer();
      this.updateStatistics();
      this.index = 0;
      this.isSoundOn = false;
      this.closeWordCardButtonClass = 'hidden';
    }
  }

  setLevelAndGroup() {
    const level = this.level + 1;
    const round = this.round + 1;
    localStorage.setItem('level', level.toString());
    localStorage.setItem('round', round.toString());
  }

  public activeItem: string;

  public onSelectItem(item: string): void {
    this.activeItem = item;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.isSoundOn) {
          this.playAudioWrongAnswer();
        }
        this.wrongWords.push(this.words[this.index]);
        this.wordsYouDontKnowQuantity += 1;
        this.index += 1;
        this.timeLeft = 60;
        this.hiddenScoreClass = 'hidden';
      }

      this.cdr.markForCheck();
    }, 1000);
  }

  pauseTimer() {
    this.cdr.markForCheck();
    clearInterval(this.interval);
  }

  stopTimer() {
    this.cdr.markForCheck();
    this.timeLeft = 0;
  }

  quitGame() {
    this.pauseTimer();
    this.level = 0;
    this.round = 0;
    this.wordsList = null;
    this.words = null;
    this.translations = null;
    this.index = 0;
    this.wordsYouKnowQuantity = 0;
    this.wordsYouDontKnowQuantity = 0;
    this.rightWords = [];
    this.wrongWords = [];
    this.isCheckedWord = null;
    this.isSoundOn = true;
    this.hiddenScore = true;
  }

  myFunction() {
    const popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
  }

  delayedHide() {
    if (this.riseScoreQuantity) {
      this.hiddenScoreClass = 'hiddenScore';

      setTimeout(() => {
        this.cdr.markForCheck();
        this.hiddenScoreClass = 'hidden';
      }, 1000);
    }
  }

  getSelectedWordCardId() {
    this.chosenWordCardClass = 'chosenWordCard';
    this.closeWordCardButtonClass = 'closeWordCardButton';
    for (const prop in this.wordsList) {
      if (this.wordsList[prop].word === this.activeItem) {
        this.describeWordBlockTranslation = this.wordsList[prop].wordTranslate;
        this.describeWordBlockTranscription = this.wordsList[prop].transcription;
        this.describeWordBlockTextExample = this.wordsList[prop].textExample;
      }
    }
  }

  ClosePopUpWindow() {
    this.closeWordCardButtonClass = 'hidden';
    this.chosenWordCardClass = 'hidden';
  }
}
