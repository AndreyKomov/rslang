import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'div[app-auth-button]',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButtonComponent implements OnInit {
  @HostBinding('class') class = 'auth-button';

  constructor() {}

  ngOnInit(): void {}
}
