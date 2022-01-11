import { TestBed } from '@angular/core/testing';

import { CotisationsService } from './cotisations.service';

describe('CotisationServiceService', () => {
  let service: CotisationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotisationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
