import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import ElectronicTextbookService from './electronic-textbook.service';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ICardInfo } from './word';

@Component({
  selector: 'app-electronic-textbook',
  templateUrl: './electronic-textbook.component.html',
  styleUrls: ['./electronic-textbook.component.scss'],
})
export default class ElectronicTextbookComponent implements AfterViewInit {
  categories = ['Easy', 'Medium', 'Normal', 'Hard', 'Hardest', 'Inferno'];
  page: number;

  dialogData: ICardInfo;

  pagesPagination = Array(30)
    .fill(0)
    .map((a, i) => {
      return i + 1;
    });

  constructor(
    private router: Router,
    private textbookService: ElectronicTextbookService,
    public dialog: MatDialog
  ) {
    this.textbookService.getCardInfo().subscribe((data) => {
      this.dialogData = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.page = this.textbookService.pages;
    }, 0);
  }

  onChangePage(event: Event): void {
    this.page = +(event.target as HTMLSelectElement).value;
    this.router.navigate(['textbook/group', this.textbookService.groups, 'page', this.page]);
  }

  /*   onClickCategory(id: number): void {} */

  onClickSettings(): void {
    this.dialog.open(SettingsDialogComponent, {
      data: this.dialogData,
    });
  }

  onClickPage(value: string): void {
    this.page = value === 'back' ? this.textbookService.pages - 1 : this.textbookService.pages + 1;
    this.textbookService.pages = this.page;
    this.router.navigate([
      'textbook/group',
      this.textbookService.groups,
      'page',
      this.textbookService.pages,
    ]);
  }
}
