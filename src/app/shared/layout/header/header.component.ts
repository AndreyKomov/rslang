import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  EventEmitter,
  Output,
  OnChanges,
  Input,
} from '@angular/core';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { WordsApiService } from '@app/server/api';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() isAuthenticated;
  @HostBinding('class') class = 'header';
  token: string | null;
  id: string | null;
  userName = '';
  userImg;

  @Output() clickAutnBtnEvent = new EventEmitter<boolean>();

  constructor(public wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.id = localStorage.getItem('token');
    this.token = localStorage.getItem('userId');
    if (this.token && this.id) {
      this.wordsApiService.getUser(this.id, this.token).subscribe((res) => {
        console.log(res);
        this.userName = res.name;
        this.userImg = res.avatar;
      });
    }
  }

  ngOnChanges(changes): void {
    if (changes.isAuthenticated.currentValue) {
      this.getUser();
    }
    console.log(changes);
  }

  openModal(value: boolean): void {
    this.clickAutnBtnEvent.emit(value);
  }
}
