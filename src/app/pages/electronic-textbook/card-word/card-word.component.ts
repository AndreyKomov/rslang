import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { URL_FILES } from '@app/core/common/constants';
import ElectronicTextbookService from '../electronic-textbook.service';
import { ICardInfo } from '../word';

@Component({
  selector: 'app-card-word',
  templateUrl: './card-word.component.html',
  styleUrls: ['./card-word.component.scss'],
  animations: [
    trigger('expandedPanel', [
      state('initial', style({ height: 0 })),
      state('expanded', style({ height: '*' })),
      transition('initial <=> expanded', animate('0.3s')),
    ]),
  ],
})
export class CardWordComponent {
  @Input() word;

  urlImage = URL_FILES;
  cardInfo: ICardInfo;

  constructor(private textbookService: ElectronicTextbookService) {
    this.textbookService.getCardInfo().subscribe((data) => {
      this.cardInfo = data;
    });
  }

  playAudio(url: string): void {
    this.textbookService.playAudio(url);
  }
}
