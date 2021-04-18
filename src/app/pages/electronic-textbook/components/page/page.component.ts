import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app/shared/services/loading.service';
import { Subscription } from 'rxjs';
import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { IWord } from '../../word';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements AfterViewInit, OnDestroy {
  array: IWord[];
  backgroundColor: string;
  subscription: Subscription;
  isDictionary: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.textbookService.dictionary = false;
    this.textbookService.setPagination = 30;
    this.subscription = this.textbookService.getWords().subscribe((data) => {
      this.array = data.filter(
        (word) => !word.userWord || (word.userWord && !word.userWord.optional.delete)
      );
    });
  }

  ngAfterViewInit(): void {
    this.isDictionary = this.textbookService.dictionary;
    this.activateRoute.params.subscribe((routeParams) => {
      const { page, group } = routeParams;
      if (page) {
        this.textbookService.pages = +page;
      }
      if (group) {
        this.textbookService.groups = +group;
        this.backgroundColor = this.textbookService.getColor(+group);
      }
      this.textbookService.getWordsPageAndGroup();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.textbookService.updateWordsArray([]);
  }
}
