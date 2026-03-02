import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPage } from './area-page';

describe('AreaPage', () => {
  let component: AreaPage;
  let fixture: ComponentFixture<AreaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
