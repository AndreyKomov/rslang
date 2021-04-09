import { Component, Input } from '@angular/core';

@Component({
  selector: 'body[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  value: string = '';

  openModal(value: string): void {
    this.value = value;
  }
}
