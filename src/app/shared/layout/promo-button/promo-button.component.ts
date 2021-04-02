import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'div[app-promo-button]',
  templateUrl: './promo-button.component.html',
  styleUrls: ['./promo-button.component.scss'],
})
export class PromoButtonComponent implements OnInit {
  @HostBinding('class') class = 'promo-button';

  constructor() {}

  ngOnInit(): void {}
}
