import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLogoComponent implements OnInit {
  imagePath: string;

  constructor() {
    this.imagePath = '../../../assets/img/logo_light.png';
  }

  ngOnInit(): void {}
}
