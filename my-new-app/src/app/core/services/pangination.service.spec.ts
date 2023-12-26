import { TestBed } from '@angular/core/testing';

import { PanginationService } from './pangination.service';

describe('PanginationService', () => {
  let service: PanginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
