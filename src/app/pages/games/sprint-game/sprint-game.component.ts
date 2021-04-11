import { ChangeDetectorRef, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import WordApiServiceComponent from '../../../server/api';

export enum KeyCode {
  rightArrow = 39,
  leftArrow = 37,
}

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent implements OnInit, OnDestroy {
  display = false;
  displayStatistics = false;
  level = 0;
  round = 0;
  wordsList: any | null;
  words: any | null;
  translations: any | null;
  index = 0;
  wordsYouKnowQuantity = 0;
  wordsYouDoNotKnowQuantity = 0;
  rightWords = [];
  wrongWords = [];
  isCheckedWord: any | null;
  audioTimerSound = new Audio();
  AudioWrongAnswer = new Audio();
  AudioRightAnswer = new Audio();
  endOGameSound = new Audio();
  isSoundOn = true;
  hiddenScore = true;
  timeLeft = 60;
  interval;
  subscribeTimer: any|null;
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
  confettiClass: string | null;
  promoInfoClass: string | null;
  startScreenClass: string | null;
  classHeaderContainer: string | null;
  gameClass: string | null;
  levelAndRoundChoice: string | null;
  checkFullScreenSize: boolean | null;
  checkFullScreenSizeStatistic: boolean | null;
  statisticClass: string | null;
  ArrayWordsYouKnowQuantity=[];
  ArrayWordsYouDoNotKnowQuantity=[];
  percentageKnownWords=[];
  completeGameDate=[];
  
  public activeItem: string;

  constructor(public api: WordApiServiceComponent, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.promoInfoClass = '';
    this.startScreenClass = 'start-screen';
    this.classHeaderContainer = 'header-container';
    this.gameClass = 'game';
    this.levelAndRoundChoice = '';
    this.statisticClass = 'statistic';
  }

  ngOnDestroy(): void {
    this.quitGame();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.keyCode === KeyCode.rightArrow) {
      this.checkWordTranslationMatch(false);
      this.timeLeft = 60;
      this.delayedHide();
    }

    if (event.keyCode === KeyCode.leftArrow) {
      this.checkWordTranslationMatch(true);
      this.timeLeft = 60;
      this.delayedHide();
    }
  }

  playAudioTimer(): void {
    if (this.isSoundOn && this.display) {
      this.audioTimerSound.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_timer.mp3?raw=true`;
      this.audioTimerSound.load();
      this.audioTimerSound.play();
    }
  }

  pauseAudioTimer(): void {
    this.audioTimerSound.pause();
  }

  playAudioWrongAnswer(): void {
    if (this.isSoundOn && this.display) {
      this.AudioWrongAnswer.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_error.mp3?raw=true`;
      this.AudioWrongAnswer.load();
      this.AudioWrongAnswer.play();
    }
  }

  pauseAudioWrongAnswer(): void {
    this.AudioWrongAnswer.pause();
  }

  playAudioRightAnswer(): void {
    if (this.isSoundOn && this.display) {
      this.AudioRightAnswer.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_correct%20.mp3?raw=true`;
      this.AudioRightAnswer.load();
      this.AudioRightAnswer.play();
    }
  }

  pauseAudioRightAnswer(): void {
    this.AudioRightAnswer.pause();
  }

  playAudioEndOfGame(): void {
    if (this.isSoundOn) {
      this.endOGameSound.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_end_of_game.mp3?raw=true`;
      this.endOGameSound.load();
      this.endOGameSound.play();
    }
  }

  pauseAudioEndOfGame(): void {
    this.endOGameSound.pause();
  }

  update(): void {
    this.display = !this.display;
  }

  updateStatistics(): void {
    this.displayStatistics = !this.displayStatistics;
    this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
      this.wordsList = data;
      this.words = this.createWordsArray(this.wordsList);
      this.words = this.shuffle(this.words);
      this.translations = this.createTranscriptionArray(this.wordsList);
      this.translations = this.shuffle(this.translations);
    });
  }

  shuffle(array): void {
    return array.sort(() => {
      return 0.5 - Math.random();
    });
  }

  onLevelChange(levelChosen): void {
    this.timeLeft=60;
    this.index=0;
    this.level = Number(levelChosen) - 1;
    this.getWords();
  }

  onRoundChange(roundChosen): void {
    this.timeLeft=60;
    this.index=0;
    this.round = Number(roundChosen) - 1;
    this.getWords();
  }

  createWordsArray = (wordsListChosen) => wordsListChosen.map((item) => item.word);
  createTranscriptionArray = (wordsListChosen) => wordsListChosen.map((item) => item.wordTranslate);

  getWords(): void {
    this.rightWords = [];
    this.wrongWords = [];
    this.wordsYouKnowQuantity = 0;
    this.wordsYouDoNotKnowQuantity = 0;
    this.wordsList = [];
    this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
      this.wordsList = data;
      this.words = this.createWordsArray(this.wordsList);
      this.words = this.shuffle(this.words);
      this.translations = this.createTranscriptionArray(this.wordsList);
      this.translations = this.shuffle(this.translations);
    });
  }

  checkWordTranslationMatch(checkPair): void {
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
    if (checkPair === result && this.display) {
      this.wordsYouKnowQuantity += 1;
      this.riseScoreQuantity = true;
      if (this.isSoundOn) {
        this.playAudioRightAnswer();
      }
      this.rightWords.push(this.words[this.index]);
    }
    if (checkPair !== result && this.display) {
      this.wordsYouDoNotKnowQuantity += 1;
      this.riseScoreQuantity = false;
      if (this.isSoundOn) {
        this.playAudioWrongAnswer();
      }
      this.wrongWords.push(this.words[this.index]);
    }
    this.index += 1;

    if (this.index > 19) {
      this.delayedConfettiClass();
      this.pauseTimer();
      this.pauseAudioTimer();
      this.playAudioEndOfGame();
      this.stopTimer();
      this.updateStatistics();
      this.index = 0;
      this.isSoundOn = false;
      this.closeWordCardButtonClass = 'hidden';
      this.promoInfoClass = 'hidden';
      this.gameClass = 'game-switched-off';
      this.levelAndRoundChoice = 'hidden';
      this.setScoreAndDateToLocalStorage();
      this.getScoreAndDateToLocalStorage()
    }
  }

  setLevelAndGroup(): void {
    const level = this.level + 1;
    const round = this.round + 1;
    localStorage.setItem('level', level.toString());
    localStorage.setItem('round', round.toString());
  }

  public onSelectItem(item: string): void {
    this.activeItem = item;
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.isSoundOn) {
          this.playAudioWrongAnswer();
        }
        this.wrongWords.push(this.words[this.index]);
        this.wordsYouDoNotKnowQuantity += 1;
        this.index += 1;
        this.timeLeft = 60;
        this.hiddenScoreClass = 'hidden';
      }

      this.cdr.markForCheck();
    }, 1000);
  }

  pauseTimer(): void {
    this.cdr.markForCheck();
    clearInterval(this.interval);
  }

  stopTimer(): void {
    this.cdr.markForCheck();
    this.timeLeft = 0;
  }

  quitGame(): void {
    this.pauseTimer();
    this.pauseAudioTimer();
    this.level = 0;
    this.round = 0;
    this.wordsList = null;
    this.words = null;
    this.translations = null;
    this.index = 0;
    this.wordsYouKnowQuantity = 0;
    this.wordsYouDoNotKnowQuantity = 0;
    this.rightWords = [];
    this.wrongWords = [];
    this.isCheckedWord = null;
    this.isSoundOn = true;
    this.hiddenScore = true;
  }

  myFunction(): void {
    const popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
  }

  delayedHide(): void {
    if (this.riseScoreQuantity) {
      this.hiddenScoreClass = 'hiddenScore';

      setTimeout(() => {
        this.cdr.markForCheck();
        this.hiddenScoreClass = 'hidden';
      }, 1000);
    }
  }

  delayedConfettiClass(): void {
    if (this.wordsYouKnowQuantity >= 10) {
      this.confettiClass = 'confettiClass';
      setTimeout(() => {
        this.cdr.markForCheck();
        this.confettiClass = '';
      }, 5000);
    }
  }

  getSelectedWordCardId(): void {
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

  ClosePopUpWindow(): void {
    this.closeWordCardButtonClass = 'hidden';
    this.chosenWordCardClass = 'hidden';
  }

  CloseStartScreenClass(): void {
    this.promoInfoClass = 'hidden';
  }

  CloseHeaderContainerClass(): void {
    this.classHeaderContainer = 'hidden';
  }

  CloseLevelAndRoundChoice(): void {
    this.levelAndRoundChoice = 'hidden';
  }

  ChangeWindowSize(): void {
    this.checkFullScreenSize = !this.checkFullScreenSize;
    if (this.checkFullScreenSize) {
      this.gameClass = 'game-full-screen';
    } else {
      this.gameClass = 'game';
    }
  }

  ChangeWindowSizeStatistic(): void {
    this.checkFullScreenSizeStatistic = !this.checkFullScreenSizeStatistic;
    if (this.checkFullScreenSizeStatistic) {
      this.statisticClass = 'statistic-full-screen';
    } else {
      this.statisticClass = 'statistic';
    }
  }
  setScoreAndDateToLocalStorage():void{
    let percent=this.wordsYouKnowQuantity/(this.wordsYouKnowQuantity+this.wordsYouDoNotKnowQuantity)*100;
    const today=new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const hour =today.getHours();
    const minutes=today.getMinutes();
    const sec=today.getSeconds();
    const todayString = `${yyyy}/${mm}/${dd} ${hour}: ${minutes}:${sec}`;
    this.ArrayWordsYouKnowQuantity.push(this.wordsYouKnowQuantity);
    this.ArrayWordsYouDoNotKnowQuantity.push(this.wordsYouDoNotKnowQuantity);
    this.percentageKnownWords.push(Math.round(percent));
    this. completeGameDate.push(todayString);

    localStorage.setItem ("sprint-correct", JSON.stringify(this.ArrayWordsYouKnowQuantity));
    localStorage.setItem ("sprint-error", JSON.stringify(this. ArrayWordsYouDoNotKnowQuantity));
    localStorage.setItem ("sprint-percent", JSON.stringify(this. percentageKnownWords));
    localStorage.setItem ("sprint-date", JSON.stringify(this. completeGameDate));
    
  }
  getScoreAndDateToLocalStorage():void{
    JSON.parse (localStorage.getItem ("sprint-correct"));
    JSON.parse (localStorage.getItem ("sprint-error"));
    JSON.parse (localStorage.getItem ("sprint-percent"));
    JSON.parse (localStorage.getItem ("sprint-date"));
 /*    console.log('right',JSON.parse (localStorage.getItem ("sprint-correct")));
    console.log('wrong',JSON.parse (localStorage.getItem ("sprint-error")));
    console.log('percent',JSON.parse (localStorage.getItem ("sprint-percent")));
    console.log('sprint-date',JSON.parse (localStorage.getItem ("sprint-date"))); */
  }

}
