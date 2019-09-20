import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsRoomsComponent } from './hotels-rooms.component';

describe('HotelsRoomsComponent', () => {
  let component: HotelsRoomsComponent;
  let fixture: ComponentFixture<HotelsRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
