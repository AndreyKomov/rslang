import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'div[app-promo]',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoComponent implements OnInit {
  @HostBinding('class') class = 'promo';
  decriptionCondition = true;
  constructor() {}

  ngOnInit(): void {}

  showHiddenContent() {
    this.decriptionCondition = !this.decriptionCondition;
  }
}
