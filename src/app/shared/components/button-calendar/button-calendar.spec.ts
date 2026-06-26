import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCalendar } from './button-calendar';

describe('ButtonCalendar', () => {
  let component: ButtonCalendar;
  let fixture: ComponentFixture<ButtonCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
