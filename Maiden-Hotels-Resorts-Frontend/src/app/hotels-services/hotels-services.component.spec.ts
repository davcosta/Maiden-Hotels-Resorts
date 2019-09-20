import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsServicesComponent } from './hotels-services.component';

describe('HotelsServicesComponent', () => {
  let component: HotelsServicesComponent;
  let fixture: ComponentFixture<HotelsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
