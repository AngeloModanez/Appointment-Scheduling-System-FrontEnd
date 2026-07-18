import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentModal } from './appointment-modal';

describe('AppointmentModal', () => {
  let component: AppointmentModal;
  let fixture: ComponentFixture<AppointmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
