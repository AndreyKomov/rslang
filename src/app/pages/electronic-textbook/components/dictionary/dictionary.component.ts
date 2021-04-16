import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app/shared/services/loading.service';

import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { IWord } from '../../word';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent {
  array: IWord[];
  wordsDictionary: IWord[];
  isDictionary = true;
  constructor(
    private activateRoute: ActivatedRoute,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.textbookService.getUserWordsArray();
    this.activateRoute.params.subscribe((routeParams) => {
      const { group } = routeParams;
      this.textbookService.wordsDictionary.subscribe((data) => {
        this.wordsDictionary = data;

        if (group === 'difficult') {
          this.array = this.wordsDictionary.filter(
            (word) => word.userWord.difficulty === 'hard' && !word.userWord.optional.delete
          );
        } else if (group === 'deleted') {
          this.array = this.wordsDictionary.filter((word) => word.userWord.optional.delete);
        } else {
          this.array = this.wordsDictionary;
        }
      });
    });
  }
}