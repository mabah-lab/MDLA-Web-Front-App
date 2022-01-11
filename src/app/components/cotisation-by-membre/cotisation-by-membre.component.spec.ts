import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotisationByMembreComponent } from './cotisation-by-membre.component';

describe('CotisationByMembreComponent', () => {
  let component: CotisationByMembreComponent;
  let fixture: ComponentFixture<CotisationByMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotisationByMembreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotisationByMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
