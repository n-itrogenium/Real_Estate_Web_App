import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateReComponent } from './user-update-re.component';

describe('UserUpdateReComponent', () => {
  let component: UserUpdateReComponent;
  let fixture: ComponentFixture<UserUpdateReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
