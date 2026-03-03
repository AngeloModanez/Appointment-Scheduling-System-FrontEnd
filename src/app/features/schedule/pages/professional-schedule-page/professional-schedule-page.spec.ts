import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalSchedulePage } from './professional-schedule-page';

describe('ProfessionalSchedulePage', () => {
  let component: ProfessionalSchedulePage;
  let fixture: ComponentFixture<ProfessionalSchedulePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalSchedulePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalSchedulePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
