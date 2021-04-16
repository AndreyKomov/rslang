import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AudioSprintService {
  audioTimerSound = new Audio('../../../../assets/sounds/audio-sprint-game/audio_timer.mp3');
  audioRightAnswer = new Audio('../../../../assets/sounds/audio-sprint-game/audio_correct.mp3');
  audioWrongAnswer = new Audio('../../../../assets/sounds/audio-sprint-game/audio_error.mp3');
  playSoundError() {
    this.audioWrongAnswer.play();
  }

  stopSoundError() {
    this.audioWrongAnswer.pause();
  }

  playSoundTimer() {
    this.audioTimerSound.play();
  }
  stopSoundTimer() {
    this.audioTimerSound.pause();
  }

  playSoundAudioRightAnswer() {
    this.audioRightAnswer.play();
  }

  stopSoundAudioRightAnswer() {
    this.audioRightAnswer.pause();
  }
}
