import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOtpPage } from './check-otp.page';

describe('CheckOtpPage', () => {
  let component: CheckOtpPage;
  let fixture: ComponentFixture<CheckOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOtpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
