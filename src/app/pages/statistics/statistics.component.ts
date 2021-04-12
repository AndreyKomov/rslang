import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  audiocallCorrect = 0;
  audiocallErrors = 0;
  percentRightAudiocall = 0;

  savannahCorrect = 0;
  savannahErrors = 0;
  percentRightSavannah = 0;

  sprintCorrect = 0;
  sprintErrors = 0;
  percentRightSprint = 0;

  allCorrectAnswers = 0;
  allErrors = 0;
  percentRightAll = 0;

  ngOnInit(): void {
    this.getCurrentAudiocallStatistic();
    this.getCurrentSavannahStatistic();
    this.getCurrentSprintStatistic();
  }

  getCurrentAudiocallStatistic(): void {
    const correctFromLocalSt = localStorage.getItem(`audiocall-correct`);
    const errorsFromLocalSt = localStorage.getItem(`audiocall-errors`);

    this.audiocallCorrect = +correctFromLocalSt;
    this.audiocallErrors = +errorsFromLocalSt;

    this.allErrors += this.audiocallErrors;
    this.allCorrectAnswers += this.audiocallCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightAudiocall =
      (this.audiocallCorrect / (this.audiocallCorrect + this.audiocallErrors)) * 100;
  }

  getCurrentSavannahStatistic(): void {
    const correctFromLocalSt = localStorage.getItem(`savannaRightAnswers`);
    const errorsFromLocalSt = localStorage.getItem(`savannaWrongAnswers`);

    this.savannahCorrect = +correctFromLocalSt;
    this.savannahErrors = +errorsFromLocalSt;

    this.allErrors += this.savannahErrors;
    this.allCorrectAnswers += this.savannahCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightSavannah =
      (this.savannahCorrect / (this.savannahCorrect + this.savannahErrors)) * 100;
  }

  getCurrentSprintStatistic(): void {
    const correctFromLocalSt = localStorage.getItem(`sprint-correct`);
    const errorsFromLocalSt = localStorage.getItem(`sprint-error`);

    this.sprintCorrect = +correctFromLocalSt;
    this.sprintErrors = +errorsFromLocalSt;

    this.allErrors += this.sprintErrors;
    this.allCorrectAnswers += this.sprintCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightSprint = (this.sprintCorrect / (this.sprintCorrect + this.sprintErrors)) * 100;
  }
}
