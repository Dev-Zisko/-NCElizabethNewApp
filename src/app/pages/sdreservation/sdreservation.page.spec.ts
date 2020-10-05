import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdreservationPage } from './sdreservation.page';

describe('SdreservationPage', () => {
  let component: SdreservationPage;
  let fixture: ComponentFixture<SdreservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdreservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdreservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
