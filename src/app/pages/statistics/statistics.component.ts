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

  constructorCorrect = 0;
  constructorErrors = 0;
  constructorRightStreak = 0;
  percentRightConstructor = 0;

  allCorrectAnswers = 0;
  allErrors = 0;
  percentRightAll = 0;

  ngOnInit(): void {
    this.getCurrentAudiocallStatistic();
    this.getCurrentSavannahStatistic();
    this.getCurrentSprintStatistic();
    this.getCurrentConstructorStatistic();
    this.percentRightAll = Math.round(this.percentRightAll);
  }

  getCurrentAudiocallStatistic(): void {
    this.audiocallCorrect = +localStorage.getItem(`audiocall-correct`);
    this.audiocallErrors = +localStorage.getItem(`audiocall-errors`);

    this.allErrors += this.audiocallErrors;
    this.allCorrectAnswers += this.audiocallCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightAudiocall =
      (this.audiocallCorrect / (this.audiocallCorrect + this.audiocallErrors)) * 100;
    this.percentRightAudiocall = Math.round(this.percentRightAudiocall);
  }

  getCurrentSavannahStatistic(): void {
    this.savannahCorrect = +localStorage.getItem(`savannaRightAnswers`);
    this.savannahErrors = +localStorage.getItem(`savannaWrongAnswers`);

    this.allErrors += this.savannahErrors;
    this.allCorrectAnswers += this.savannahCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightSavannah =
      (this.savannahCorrect / (this.savannahCorrect + this.savannahErrors)) * 100;
    this.percentRightSavannah = Math.round(this.percentRightSavannah);
  }

  getCurrentSprintStatistic(): void {
    const rightSprtint = localStorage.getItem(`sprint-correct`);
    const wrongSprint = localStorage.getItem(`sprint-error`);

    this.sprintCorrect = JSON.parse(rightSprtint)[0];
    this.sprintErrors = JSON.parse(wrongSprint)[0];
    this.allErrors += this.sprintErrors;
    this.allCorrectAnswers += this.sprintCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightSprint = (this.sprintCorrect / (this.sprintCorrect + this.sprintErrors)) * 100;
    this.percentRightSprint = Math.round(this.percentRightSprint);
  }

  getCurrentConstructorStatistic(): void {
    this.constructorRightStreak = +localStorage.getItem(`wordConstructorRightStreak`);
    this.constructorCorrect = +localStorage.getItem(`wordConstructorRightAnswers`);
    this.constructorErrors = +localStorage.getItem(`wordConstructorWrongAnswers`);

    this.allErrors += this.constructorErrors;
    this.allCorrectAnswers += this.constructorCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightConstructor =
      (this.constructorCorrect / (this.constructorCorrect + this.constructorErrors)) * 100;
    this.percentRightConstructor = Math.round(this.percentRightConstructor);
  }
}
