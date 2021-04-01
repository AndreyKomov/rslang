import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ElectronicTextbookService from '../electronic-textbook.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export default class CategoryComponent {
  array: any;

  constructor(private activateRoute: ActivatedRoute, private service: ElectronicTextbookService) {
    const { id } = this.activateRoute.snapshot.params;
    this.service.getWordDetalization(0, id).then((data) => (this.array = data));
    console.log(id);
  }
}
