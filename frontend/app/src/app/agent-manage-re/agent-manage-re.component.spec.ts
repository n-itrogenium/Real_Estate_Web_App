import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManageReComponent } from './agent-manage-re.component';

describe('AgentManageReComponent', () => {
  let component: AgentManageReComponent;
  let fixture: ComponentFixture<AgentManageReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentManageReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentManageReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
