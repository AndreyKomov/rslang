import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MainNav } from './header-menu.enum';
import { ParamKey } from '@app/app-routing.enum';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent implements OnInit {
  navMenu: Array<Array<string>>;
  menuRoutes: object;

  constructor() {
    this.navMenu = Object.entries(MainNav);
    this.menuRoutes = ParamKey;
  }

  ngOnInit(): void {}
}
