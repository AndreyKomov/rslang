import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons-dictionary',
  templateUrl: './buttons-dictionary.component.html',
  styleUrls: ['./buttons-dictionary.component.scss'],
})
export class ButtonsDictionaryComponent {
  buttons = [
    { rus: 'Изученные', en: 'studied' },
    { rus: 'Сложные', en: 'difficult' },
    { rus: 'Удаленные', en: 'deleted' },
  ];
}
