import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchInput } from './table-search-input';

describe('TableSearchInput', () => {
  let component: TableSearchInput;
  let fixture: ComponentFixture<TableSearchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSearchInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSearchInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
