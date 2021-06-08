import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddReComponent } from './user-add-re.component';

describe('UserAddReComponent', () => {
  let component: UserAddReComponent;
  let fixture: ComponentFixture<UserAddReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
