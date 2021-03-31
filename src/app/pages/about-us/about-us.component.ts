import { Component } from '@angular/core';
import IPerson from './aboutUs';
import person from './persons-mock';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export default class AboutUsComponent {
  persons: IPerson[];

  constructor() {
    this.persons = person;
  }
}
