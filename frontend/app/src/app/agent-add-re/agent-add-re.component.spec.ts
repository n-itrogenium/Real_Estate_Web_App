import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAddReComponent } from './agent-add-re.component';

describe('AgentAddReComponent', () => {
  let component: AgentAddReComponent;
  let fixture: ComponentFixture<AgentAddReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentAddReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAddReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
