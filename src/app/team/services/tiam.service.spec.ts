import { TestBed } from '@angular/core/testing';

import { TiamService } from './tiam.service';

describe('TiamService', () => {
  let service: TiamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
