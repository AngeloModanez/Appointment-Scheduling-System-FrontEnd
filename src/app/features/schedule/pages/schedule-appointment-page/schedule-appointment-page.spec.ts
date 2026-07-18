import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentPage } from './schedule-appointment-page';

describe('ScheduleAppointmentPage', () => {
  let component: ScheduleAppointmentPage;
  let fixture: ComponentFixture<ScheduleAppointmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleAppointmentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAppointmentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
