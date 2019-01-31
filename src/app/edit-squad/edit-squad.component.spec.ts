import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSquadComponent } from './edit-squad.component';

describe('EditSquadComponent', () => {
  let component: EditSquadComponent;
  let fixture: ComponentFixture<EditSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
