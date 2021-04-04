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
getWordsByPageAndGroup:object|null;

constructor(public api: WordApiServiceComponent) {}
ngOnInit(): void {
  this.api.getWordsByPageAndGroup(this.round, this.level).subscribe((data) => {
    this.getWordsByPageAndGroup = data;
    console.log(this.getWordsByPageAndGroup)
  });
 
}

update(){
   this.display = !this.display;
}
/* 
getWords() {

  this.wordsList = await learnWordsAPIService.getWordsByPageAndGroup(this.round, this.level);
  shuffle(this.wordsList);
  this.words = createWordsArray(this.wordsList);
  this.translations = createTranslationsArray(this.wordsList);
} */

}
