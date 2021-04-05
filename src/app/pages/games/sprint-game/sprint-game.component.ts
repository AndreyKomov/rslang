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

constructor(public api: WordApiServiceComponent) {}
ngOnInit(): void {
  this.getWords();
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
    console.log('right');
  this.rightWords.push(this.words[this.index])
 }
if(checkPair!==result){
  this.wordsYouDontKnow=this.wordsYouDontKnow+1;
  console.log('wrong');
   this.wrongWords.push(this.words[this.index])
  }
this.index=this.index+1;
if(this.index>19){
  console.log('game over');
  this.updateStatistics();
  this.index=0;
}
}

setLevelAndGroup() {
  const level=this.level + 1;
  const round=this.round + 1;
  localStorage.setItem('level', level.toString());
  localStorage.setItem('round',round.toString());
}

}
