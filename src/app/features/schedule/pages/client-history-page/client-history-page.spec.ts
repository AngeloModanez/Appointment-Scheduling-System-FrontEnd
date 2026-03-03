import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistoryPage } from './client-history-page';

describe('ClientHistoryPage', () => {
  let component: ClientHistoryPage;
  let fixture: ComponentFixture<ClientHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientHistoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientHistoryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
