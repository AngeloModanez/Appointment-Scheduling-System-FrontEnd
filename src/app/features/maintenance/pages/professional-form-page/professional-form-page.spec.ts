import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFormPage } from './professional-form-page';

describe('ProfessionalFormPage', () => {
  let component: ProfessionalFormPage;
  let fixture: ComponentFixture<ProfessionalFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
