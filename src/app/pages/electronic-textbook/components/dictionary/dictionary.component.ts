import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app/shared/services/loading.service';
import { ElectronicTextbookService } from '../../electronic-textbook.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    console.log(this.textbookService.getUserWordsArray());
  }

  ngOnInit(): void {}
}
