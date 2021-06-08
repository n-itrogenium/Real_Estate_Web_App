import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentUpdateReComponent } from './agent-update-re.component';

describe('AgentUpdateReComponent', () => {
  let component: AgentUpdateReComponent;
  let fixture: ComponentFixture<AgentUpdateReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentUpdateReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentUpdateReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
