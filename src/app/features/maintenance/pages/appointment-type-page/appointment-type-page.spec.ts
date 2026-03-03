import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypePage } from './appointment-type-page';

describe('AppointmentTypePage', () => {
  let component: AppointmentTypePage;
  let fixture: ComponentFixture<AppointmentTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
