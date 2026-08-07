import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsTablePage } from './professionals-table-page';

describe('ProfessionalsTablePage', () => {
  let component: ProfessionalsTablePage;
  let fixture: ComponentFixture<ProfessionalsTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalsTablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalsTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
