import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app/shared/services/loading.service';
import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { IWord } from '../../word';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  wordsDictionary: IWord[];
  constructor(
    private activateRoute: ActivatedRoute,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.textbookService.getUserWordsArray();
    this.textbookService.wordsDictionary.subscribe((data) => {
      this.wordsDictionary = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((routeParams) => {
      const { group } = routeParams;
      console.log(group);
      console.log(this.wordsDictionary);

      /*  if (group === 'difficult') {
        this.wordsDictionary = this.wordsDictionary.filter(
          (word) => word.userWord.difficulty === 'hard'
        );
      } else if (group === 'deleted') {
        this.wordsDictionary = this.wordsDictionary.filter((word) => word.userWord.optional.delete);
      } */
    });
  }
}
