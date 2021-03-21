import { TestBed } from '@angular/core/testing';

import { OurGameService } from './our-game.service';

describe('OurGameService', () => {
  let service: OurGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
