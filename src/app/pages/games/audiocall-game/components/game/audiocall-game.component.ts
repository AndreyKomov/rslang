import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audiocall-game',
  templateUrl: './audiocall-game.component.html',
  styleUrls: ['./audiocall-game.component.scss'],
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

  constructor() {}

  ngOnInit(): void {}
}
