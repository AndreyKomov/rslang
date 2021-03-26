import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ParamKey } from '@app/app-routing.enum';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLogoComponent implements OnInit {
  imagePath: string;
  homePath: string;

  constructor() {
    this.imagePath = '../../../assets/img/logo_light.png';
    this.homePath = ParamKey.main;
  }

  ngOnInit(): void {}
}
