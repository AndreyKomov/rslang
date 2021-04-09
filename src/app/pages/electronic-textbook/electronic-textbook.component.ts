import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import WordsApiServiceComponent from '@app/server/api';
import { Subscription } from 'rxjs';
import ElectronicTextbookService from './electronic-textbook.service';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ICardInfo } from './word';

@Component({
  selector: 'app-electronic-textbook',
  templateUrl: './electronic-textbook.component.html',
  styleUrls: ['./electronic-textbook.component.scss'],
})
export default class ElectronicTextbookComponent
  implements AfterViewInit, OnDestroy, AfterViewChecked {
  categories = ['Easy', 'Medium', 'Normal', 'Hard', 'Hardest', 'Inferno'];
  page = 0;
  group = 0;
  dialogData: ICardInfo;
  colorLink: string;
  subscriptionTextbookService: Subscription;

  constructor(
    private router: Router,
    private textbookService: ElectronicTextbookService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private api: WordsApiServiceComponent
  ) {
    this.subscriptionTextbookService = this.textbookService.getCardInfo().subscribe((data) => {
      this.dialogData = data;
    });
  }

  ngAfterViewInit(): void {
    this.group = this.textbookService.groups;
    this.colorLink = this.textbookService.getColor(this.group);
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.page = this.textbookService.pages;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptionTextbookService.unsubscribe();
  }

  onClickCategory(id: number): void {
    this.colorLink = this.textbookService.getColor(id);
    this.group = id;
    this.page = 0;
  }

  onClickSettings(): void {
    this.dialog.open(SettingsDialogComponent, {
      data: this.dialogData,
    });
  }
}
