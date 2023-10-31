import { TestBed } from '@angular/core/testing';

import { OpenFilterMenuService } from './open-filter-menu.service';

describe('OpenFilterMenuService', () => {
  let service: OpenFilterMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFilterMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
