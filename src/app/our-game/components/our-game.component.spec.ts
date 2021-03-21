import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurGameComponent } from './our-game.component';

describe('OurGameComponent', () => {
  let component: OurGameComponent;
  let fixture: ComponentFixture<OurGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
