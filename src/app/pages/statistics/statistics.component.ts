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
  percentRightAnswers = 0;
  allCorrectAnswers = 0;
  allErrors = 0;
  percentRightAll = 0;

  ngOnInit(): void {
    this.getCurrentStatistic('audiocall');
  }

  getCurrentStatistic(gameName: string): void {
    const correctFromLocalSt = localStorage.getItem(`${gameName}-correct`);
    const errorsFromLocalSt = localStorage.getItem(`${gameName}-errors`);

    this.audiocallCorrect = +correctFromLocalSt;
    this.audiocallErrors = +errorsFromLocalSt;
    this.allErrors += this.audiocallErrors;

    this.allCorrectAnswers += this.audiocallCorrect;
    this.percentRightAll =
      (this.allCorrectAnswers / (this.allCorrectAnswers + this.allErrors)) * 100;

    this.percentRightAnswers =
      (this.audiocallCorrect / (this.audiocallCorrect + this.audiocallErrors)) * 100;
  }
}
