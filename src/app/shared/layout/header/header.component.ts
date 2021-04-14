import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  EventEmitter,
  Output,
} from '@angular/core';
import { WordsApiService } from '@app/server/api';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'header';
  token: string | null = localStorage.getItem('token');
  id: string | null = localStorage.getItem('userId');
  userName = '';
  userImg;

  @Output() clickAutnBtnEvent = new EventEmitter<boolean>();

  constructor(public wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    if (this.token && this.id) {
      this.wordsApiService.getUser(this.id, this.token).subscribe((res) => {
        console.log(res);
        this.userName = res.name;
        this.userImg = res.avatar;
      });
    }
  }

  openModal(value: boolean): void {
    this.clickAutnBtnEvent.emit(value);
  }
}
