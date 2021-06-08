import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMyReComponent } from './agent-my-re.component';

describe('AgentMyReComponent', () => {
  let component: AgentMyReComponent;
  let fixture: ComponentFixture<AgentMyReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentMyReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMyReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
