import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasTablePage } from './areas-table-page';

describe('AreasTablePage', () => {
  let component: AreasTablePage;
  let fixture: ComponentFixture<AreasTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasTablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
