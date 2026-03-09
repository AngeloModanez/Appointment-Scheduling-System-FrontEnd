import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTablePage } from './client-table-page';

describe('ClientTablePage', () => {
  let component: ClientTablePage;
  let fixture: ComponentFixture<ClientTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
