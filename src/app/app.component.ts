import { Component } from '@angular/core';

@Component({
  selector: 'body[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  value = '';

  openModal(value: string): void {
    this.value = value;
  }
}
