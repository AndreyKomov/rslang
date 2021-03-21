import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioCallComponent {}
