import { TestBed } from '@angular/core/testing';

import { SavannaService } from './savanna.service';

describe('SavannaService', () => {
  let service: SavannaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavannaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
