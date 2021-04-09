import { Component, OnInit, ChangeDetectionStrategy, HostBinding, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'header';

  @Output() clickAutnBtnEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  openModal(value): void {
    this.clickAutnBtnEvent.emit(value);
  }
}
