import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMembersComponent } from './the-members.component';

describe('TheMembersComponent', () => {
  let component: TheMembersComponent;
  let fixture: ComponentFixture<TheMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
