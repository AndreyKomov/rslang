import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'div[app-header-logo]',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLogoComponent implements OnInit {
  @HostBinding('class') class = 'logo';

  constructor() {}

  ngOnInit(): void {}
}
