import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayAppointmentsPage } from './today-appointments-page';

describe('TodayAppointmentsPage', () => {
  let component: TodayAppointmentsPage;
  let fixture: ComponentFixture<TodayAppointmentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayAppointmentsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayAppointmentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
