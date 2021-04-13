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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'header';
  token: string | null = localStorage.getItem('token');
  id: string | null = localStorage.getItem('userId');
  user = this.wordsApiService.getUser(this.id, this.token).subscribe((res) => {
    console.log(res);
  });

  @Output() clickAutnBtnEvent = new EventEmitter<boolean>();

  constructor(public wordsApiService: WordsApiService) {}

  ngOnInit(): void {}

  openModal(value: boolean): void {
    this.clickAutnBtnEvent.emit(value);
  }
}
