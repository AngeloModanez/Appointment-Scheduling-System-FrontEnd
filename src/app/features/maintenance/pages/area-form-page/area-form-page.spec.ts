import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFormPage } from './area-form-page';

describe('AreaFormPage', () => {
  let component: AreaFormPage;
  let fixture: ComponentFixture<AreaFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
