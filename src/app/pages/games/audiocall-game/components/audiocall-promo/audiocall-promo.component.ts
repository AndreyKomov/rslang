import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audiocall-promo',
  templateUrl: './audiocall-promo.component.html',
  styleUrls: ['./audiocall-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiocallPromoComponent implements OnInit {
  startFromMenu = true;

  constructor() {}

  ngOnInit(): void {}
}
