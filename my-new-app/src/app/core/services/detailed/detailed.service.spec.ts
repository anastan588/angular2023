import { TestBed } from '@angular/core/testing';

import { DetailedService } from './detailed.service';

describe('DetailedService', () => {
  let service: DetailedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
