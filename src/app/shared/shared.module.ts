import { NgModule } from '@angular/core';

import { HeaderComponent } from './layout/header/header.component';
import { HeaderMenuComponent } from './layout/header-menu/header-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu/header-user-menu.component';
import { HeaderLogoComponent } from './layout/header-logo/header-logo.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { MainComponent } from './layout/main/main.component';

@NgModule({
    declarations: [HeaderComponent, HeaderMenuComponent, HeaderUserMenuComponent, HeaderLogoComponent, FooterComponent, AuthenticationComponent, MainComponent],
    exports: [HeaderComponent, HeaderMenuComponent, HeaderUserMenuComponent, HeaderLogoComponent, FooterComponent, AuthenticationComponent, MainComponent],
    providers: []
})
export default class SharedModule { }