import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyReComponent } from './user-my-re.component';

describe('UserMyReComponent', () => {
  let component: UserMyReComponent;
  let fixture: ComponentFixture<UserMyReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMyReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
