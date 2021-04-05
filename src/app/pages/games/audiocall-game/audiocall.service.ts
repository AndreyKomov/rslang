import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AudiocallService {
  error = new Audio('../../../../assets/sounds/error.mp3');
  failure = new Audio('../../../../assets/sounds/failure.mp3');
  correct = new Audio('../../../../assets/sounds/correct.mp3');
  success = new Audio('../../../../assets/sounds/success.mp3');
  constructor() {}

  playSound(sound) {
    sound.play();
  }
}
