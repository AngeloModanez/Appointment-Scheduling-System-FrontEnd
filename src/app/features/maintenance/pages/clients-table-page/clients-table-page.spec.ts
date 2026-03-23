import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTablePage } from './clients-table-page';

describe('ClientsTablePage', () => {
  let component: ClientsTablePage;
  let fixture: ComponentFixture<ClientsTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTablePage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientsTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
