import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audiocall-game',
  templateUrl: './audiocall-game.component.html',
  styleUrls: ['./audiocall-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiocallGameComponent implements OnInit {
  // inValue = '';
  wordsArray: any[] = [
    {
      id: 1,
      word: 'string',
      image: '',
      audio: '',
      wordTranslate: 'строка',
    },
    {
      id: 2,
      word: 'fish',
      image: '',
      audio: '',
      wordTranslate: 'рыба',
    },
    {
      id: 1,
      word: 'sky',
      image: '',
      audio: '',
      wordTranslate: 'небо',
    },
    {
      id: 1,
      word: 'spring',
      image: '',
      audio: '',
      wordTranslate: 'весна',
    },
    {
      id: 1,
      word: 'flagman',
      image: '',
      audio: '',
      wordTranslate: 'флагман',
    },
  ];

  difficulty = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((d) => {
      console.log(d);
      this.difficulty = d.difficult;

      this.getWordsFromBE();
    });
  }

  getWordsFromBE() {
    // this method get words from beck-end
    // to use this.difficulty
    // .subscribe((data) => {})
  }

  checkWord(word) {
    console.log(word);
  }
}
