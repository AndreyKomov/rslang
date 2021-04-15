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
  @Output() isLogin = new EventEmitter<boolean>();

  constructor(public wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('userId');
    if (this.token && this.id) {
      this.wordsApiService.getUser(this.id, this.token).subscribe((res) => {
        this.isLogin.emit(true);
        this.userName = res.name;
        if (res.avatar === '') {
          this.userImg = '../../../../assets/img/no-avatar.png';
        } else {
          this.userImg = res.avatar;
        }
      });
    }
  }

  ngOnChanges(changes): void {
    if (this.isAuthenticated) {
      this.getUser();
    }
  }

  openModal(value: boolean): void {
    this.clickAutnBtnEvent.emit(value);
  }
}
