import { Component, Input } from '@angular/core';
import { URL_FILES } from '@app/core/common/constants';
import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { ICardInfo, IWord } from '../../word';

@Component({
  selector: 'app-card-word',
  templateUrl: './card-word.component.html',
  styleUrls: ['./card-word.component.scss'],
})
export class CardWordComponent {
  @Input() word: IWord;

  urlImage = URL_FILES;
  cardInfo: ICardInfo;

  constructor(public textbookService: ElectronicTextbookService) {
    this.textbookService.getCardInfo().subscribe((data) => {
      this.cardInfo = data;
    });
  }

  playAudio(): void {
    const url = [this.word.audio, this.word.audioExample, this.word.audioMeaning];
    this.textbookService.playAudio(url);
  }

  addWordHard(): void {
    this.textbookService[this.word.userWord ? 'updateUserWord' : 'addUserWord'](
      this.word.id,
      'hard',
      {
        date: Date.now(),
        repeat: 0,
        delete: false,
      }
    );
  }

  addWordDeleted(): void {
    const difficulty = this.word.userWord ? this.word.userWord.difficulty : 'easy';
    this.textbookService[this.word.userWord ? 'updateUserWord' : 'addUserWord'](
      this.word.id,
      difficulty,
      {
        date: Date.now(),
        repeat: 0,
        delete: true,
      }
    );
  }
}
