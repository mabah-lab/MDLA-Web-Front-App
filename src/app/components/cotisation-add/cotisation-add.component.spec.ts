import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotisationAddComponent } from './cotisation-add.component';

describe('CotisationAddComponent', () => {
  let component: CotisationAddComponent;
  let fixture: ComponentFixture<CotisationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotisationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotisationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
