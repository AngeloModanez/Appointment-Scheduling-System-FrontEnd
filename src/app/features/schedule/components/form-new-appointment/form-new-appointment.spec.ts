import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewAppointment } from './form-new-appointment';

describe('FormNewAppointment', () => {
  let component: FormNewAppointment;
  let fixture: ComponentFixture<FormNewAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
