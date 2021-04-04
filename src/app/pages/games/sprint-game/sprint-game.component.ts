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

constructor(public api: WordApiServiceComponent) {}
ngOnInit(): void {
  this.getWords()
 
}

update(){
   this.display = !this.display;
}
onLevelChange(level){
this.level=  Number(level)-1;
this.getWords()
}
onRoundChange(round){
  this.round=  Number(round)-1;
  this.getWords()
  }
getWords(){
  this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
    this.wordsList = data;
    console.log(this.wordsList)
  });
}
/* 
getWords() {

  this.wordsList = await learnWordsAPIService.getWordsByPageAndGroup(this.round, this.level);
  shuffle(this.wordsList);
  this.words = createWordsArray(this.wordsList);
  this.translations = createTranslationsArray(this.wordsList);
} */

}
