import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayAppointmentPage } from './today-appointment-page';

describe('TodayAppointmentPage', () => {
  let component: TodayAppointmentPage;
  let fixture: ComponentFixture<TodayAppointmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayAppointmentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayAppointmentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
