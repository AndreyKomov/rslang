import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronic-textbook',
  templateUrl: './electronic-textbook.component.html',
  styleUrls: ['./electronic-textbook.component.scss'],
})
export default class ElectronicTextbookComponent {
  categories = ['Easy', 'Medium', 'Normal', 'Hard', 'Hardest', 'Inferno'];

  constructor(private router: Router) {}

  onClickCategory(id: number): void {
    this.router.navigate(['textbook/group', id]);
  }
}
