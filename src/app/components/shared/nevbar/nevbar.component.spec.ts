import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NevbarComponent } from './nevbar.component';

describe('NevbarComponent', () => {
  let component: NevbarComponent;
  let fixture: ComponentFixture<NevbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NevbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NevbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
