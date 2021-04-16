import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ElectronicTextbookService } from './electronic-textbook.service';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { ICardInfo } from './word';

@Component({
  selector: 'app-electronic-textbook',
  templateUrl: './electronic-textbook.component.html',
  styleUrls: ['./electronic-textbook.component.scss'],
})
export default class ElectronicTextbookComponent
  implements AfterViewInit, OnDestroy, AfterViewChecked {
  page = 0;
  group = 0;
  isDictionary = false;
  dialogData: ICardInfo;
  colorLink: string;
  subscriptionTextbookService: Subscription;

  constructor(
    private textbookService: ElectronicTextbookService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
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
