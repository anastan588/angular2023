import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { favouriteGuard } from './favourite.guard';

describe('favouriteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => favouriteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
