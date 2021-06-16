import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgthreadComponent } from './msgthread.component';

describe('MsgthreadComponent', () => {
  let component: MsgthreadComponent;
  let fixture: ComponentFixture<MsgthreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgthreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
