import { Component, OnInit } from '@angular/core';
import { ElectronicTextbookService } from '../../electronic-textbook.service';

@Component({
  selector: 'app-buttons-game',
  templateUrl: './buttons-game.component.html',
  styleUrls: ['./buttons-game.component.scss'],
})
export class ButtonsGameComponent implements OnInit {
  groupValue = this.textBookService.groups;
  pageValue = this.textBookService.pages;

  constructor(private textBookService: ElectronicTextbookService) {}

  ngOnInit(): void {}
}
