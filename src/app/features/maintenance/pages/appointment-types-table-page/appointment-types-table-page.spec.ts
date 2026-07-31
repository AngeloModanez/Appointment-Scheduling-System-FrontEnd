import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypesTablePage } from './appointment-types-table-page';

describe('AppointmentTypesTablePage', () => {
  let component: AppointmentTypesTablePage;
  let fixture: ComponentFixture<AppointmentTypesTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentTypesTablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypesTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
