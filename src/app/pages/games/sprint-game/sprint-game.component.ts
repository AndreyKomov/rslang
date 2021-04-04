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
level=0;
round=0;
wordsList:object|null;
words:object|null;
translations:object|null;
index=0;
wordsYouKnow=0;
wordsYouDontKnow=0;

constructor(public api: WordApiServiceComponent) {}
ngOnInit(): void {
  this.getWords()
}

update(){
   this.display = !this.display;
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
  console.log('right');
  this.wordsYouKnow=this.wordsYouKnow+1;
}
if(checkPair!==result){
  this.wordsYouDontKnow=this.wordsYouDontKnow+1;
  console.log('wrong')}
this.index=this.index+1;
}

setLevelAndGroup() {
  const level=this.level + 1;
  const round=this.round + 1;
  localStorage.setItem('level', level.toString());
  localStorage.setItem('round',round.toString());
}

}
