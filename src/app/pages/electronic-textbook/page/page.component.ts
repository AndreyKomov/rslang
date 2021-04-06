import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import WordsApiServiceComponent from '@app/server/api';
import { LoadingService } from '@app/shared/services/loading.service';
import ElectronicTextbookService from '../electronic-textbook.service';
import { IWord } from '../word';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  array: IWord;
  constructor(
    private activateRoute: ActivatedRoute,
    private api: WordsApiServiceComponent,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService
  ) {
    /*    const { page, group }: Params = this.activateRoute.snapshot.params;
    if (page) this.textbookService.pages = +page;
    if (group) this.textbookService.groups = +group;
    this.api
      .getWordsByPageAndGroup(this.textbookService.pages, this.textbookService.groups)
      .subscribe((data: IWord) => {
        this.array = data;
      }); */
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((routeParams) => {
      const { page, group } = routeParams;
      if (page) this.textbookService.pages = +page;
      if (group) this.textbookService.groups = +group;
      this.api
        .getWordsByPageAndGroup(this.textbookService.pages, this.textbookService.groups)
        .subscribe((data: IWord) => {
          this.array = data;
        });
    });
  }
}
