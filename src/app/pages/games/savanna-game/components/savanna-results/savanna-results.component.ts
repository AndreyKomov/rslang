import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import WordsApiServiceComponent from '@app/server/api';
import { SavannaService } from '../../savanna.service';

@Component({
  selector: 'app-savanna-results',
  templateUrl: './savanna-results.component.html',
  styleUrls: ['./savanna-results.component.scss'],
})
export class SavannaResultsComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private backEndService: WordsApiServiceComponent,
    private gameService: SavannaService
  ) {}
  rightAnswers = localStorage.getItem('savannaRightAnswers');
  wrongAnswers = localStorage.getItem('savannaWrongAnswers');
  ngOnInit(): void {

  }
}
