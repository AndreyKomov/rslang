import { Component, OnInit } from '@angular/core';
import WordApiServiceComponent from '../../../server/api';


@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss']
})

export class SprintGameComponent implements OnInit {
message: string = "DataModule";
display = false;
displayStatistics=false;
level=0;
round=0;
wordsList:object|null;
words:object|null;
translations:object|null;
index=0;
wordsYouKnow=0;
wordsYouDontKnow=0;
rightWords=[]
wrongWords=[]
isCheckedWord:object|null;
audioTimerSound=new Audio();
AudioWrongAnswer=new Audio();
AudioRightAnswer=new Audio();
isSoundOn=true;

constructor(public api: WordApiServiceComponent) {}
ngOnInit(): void {
  this.getWords();
 }

 playAudioTimer() { 
   if(this.isSoundOn){
    this.audioTimerSound.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_timer.mp3?raw=true`;
    this.audioTimerSound.load();
    this.audioTimerSound.play();
   }

} 

pauseAudioTimer() { 
  this.audioTimerSound.pause(); 
} 
playAudioWrongAnswer( ) { 
  if(this.isSoundOn){
    this.AudioWrongAnswer.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_error.mp3?raw=true`;
    this.AudioWrongAnswer.load();
    this.AudioWrongAnswer.play();
   }
} 
pauseAudioWrongAnswer() { 
 this.AudioWrongAnswer.pause(); 
} 
playAudioRightAnswer( ) { 
  if(this.isSoundOn){
    this.AudioRightAnswer.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_correct%20.mp3?raw=true`;
    this.AudioRightAnswer.load();
    this.AudioRightAnswer.play();
   }
} 
pauseAudioRightAnswer() { 
 this.AudioRightAnswer.pause(); 
}
playAudioEndOfGame( ) { 
  if(this.isSoundOn){
    let endOGameSound=new Audio();
    endOGameSound.src = `https://github.com/Yuliya-soul/Sounds/blob/master/assets/audio/audio_end_of_game.mp3?raw=true`;
    endOGameSound.load();
    endOGameSound.play();
   }
} 
update(){
   this.display = !this.display;
}

updateStatistics(){
  this.displayStatistics = !this.displayStatistics;
}
shuffle (array)  {
  return array.sort(function() {
      return 0.5 - Math.random();
  });
};

onLevelChange(level){
this.level=  Number(level)-1;
this.getWords()
}
onRoundChange(round){
  this.round=  Number(round)-1;
  this.getWords()
  }
createWordsArray = (wordsList) => wordsList.map((item) => item.word);
createTranscriptionArray =  (wordsList) => wordsList.map((item) => item.wordTranslate);
getWords(){
  this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
    this.wordsList = data;
    this.words=this.createWordsArray(this.wordsList);
    this.words=this.shuffle(this.words);
    this.translations=this.createTranscriptionArray(this.wordsList);
    this.translations=this.shuffle(this.translations);
  });
}

checkWordTranslationMatch(checkPair){
 const matchWordCheck= this.words[this.index];
 const matchTranslationCheck=this.translations[this.index];
 let result;
 for (var prop in this.wordsList) {
   if((this.wordsList[prop].word===matchWordCheck)&&(this.wordsList[prop].wordTranslate===matchTranslationCheck)){
    result=true
   }
   else {result=false}
 
}
if(checkPair===result){
  this.wordsYouKnow=this.wordsYouKnow+1;
  if(this.isSoundOn){ this.playAudioRightAnswer()}  
  this.rightWords.push(this.words[this.index])
 }
if(checkPair!==result){
  this.wordsYouDontKnow=this.wordsYouDontKnow+1;
  if(this.isSoundOn){ this.playAudioWrongAnswer()}
  this.wrongWords.push(this.words[this.index])
  }
this.index=this.index+1;
if(this.index>19){
  this.pauseAudioTimer()
  this.playAudioEndOfGame( )
  this.updateStatistics();
  this.index=0;
  this.isSoundOn=false;
}
}

setLevelAndGroup() {
  const level=this.level + 1;
  const round=this.round + 1;
  localStorage.setItem('level', level.toString());
  localStorage.setItem('round',round.toString());
}

}
