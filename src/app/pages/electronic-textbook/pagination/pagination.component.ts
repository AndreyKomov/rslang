import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ElectronicTextbookService from '../electronic-textbook.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() page: number;
  @Input() quantityPage: number;

  pagesPagination: number[];

  constructor(private router: Router, private textbookService: ElectronicTextbookService) {}

  ngOnInit(): void {
    this.pagesPagination = Array(this.quantityPage)
      .fill(0)
      .map((a, i) => {
        return i;
      });
  }

  onChangePage(event: Event): void {
    this.page = +(event.target as HTMLSelectElement).value;
    this.router.navigate(['textbook/group', this.textbookService.groups, 'page', this.page]);
  }

  onClickPage(value: string): void {
    this.page = value === 'back' ? this.textbookService.pages - 1 : this.textbookService.pages + 1;
    this.textbookService.pages = this.page;
    this.router.navigate([
      'textbook/group',
      this.textbookService.groups,
      'page',
      this.textbookService.pages,
    ]);
  }
}
