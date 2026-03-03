import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAppointmentPage } from './cancel-appointment-page';

describe('CancelAppointmentPage', () => {
  let component: CancelAppointmentPage;
  let fixture: ComponentFixture<CancelAppointmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelAppointmentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAppointmentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
