import { TestBed } from '@angular/core/testing';

import { DefaultpageService } from './defaultpage.service';

describe('DefaultpageService', () => {
  let service: DefaultpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
