import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ParamKey } from '@app/app-routing.enum';
import { MainNav } from './header-menu.enum';

@Component({
  selector: 'div[app-header-menu]',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent implements OnInit {
  @HostBinding('class') class = 'menu';

  navMenu: Array<Array<string>>;

  menuRoutes: object;

  constructor() {
    this.navMenu = Object.entries(MainNav);
    this.menuRoutes = ParamKey;
  }

  ngOnInit(): void {}
}
