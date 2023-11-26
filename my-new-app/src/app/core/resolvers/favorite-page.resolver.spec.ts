import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { favoritePageResolver } from './favorite-page.resolver';

describe('favoritePageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => favoritePageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
