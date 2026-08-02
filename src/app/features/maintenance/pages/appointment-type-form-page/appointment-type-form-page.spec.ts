import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypeFormPage } from './appointment-type-form-page';

describe('AppointmentTypeFormPage', () => {
  let component: AppointmentTypeFormPage;
  let fixture: ComponentFixture<AppointmentTypeFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentTypeFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypeFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
