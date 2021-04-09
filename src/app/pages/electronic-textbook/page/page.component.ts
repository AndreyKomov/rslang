import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import WordsApiServiceComponent from '@app/server/api';
import { LoadingService } from '@app/shared/services/loading.service';
import { Subscription } from 'rxjs';
import ElectronicTextbookService from '../electronic-textbook.service';
import { IWord } from '../word';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements AfterViewInit, OnDestroy {
  array: IWord[];
  backgroundColor: string;
  subscription: Subscription;
  constructor(
    private activateRoute: ActivatedRoute,
    private api: WordsApiServiceComponent,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.activateRoute.params.subscribe((routeParams) => {
      const { page, group } = routeParams;
      if (page) this.textbookService.pages = +page;
      if (group) {
        this.textbookService.groups = +group;
        this.backgroundColor = this.textbookService.getColor(+group);
      }
      this.textbookService
        .getWordsPageAndGroup()
        .toPromise()
        .then(() => {
          this.subscription = this.textbookService.getWords().subscribe((data) => {
            this.array = data;
          });
        });

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
