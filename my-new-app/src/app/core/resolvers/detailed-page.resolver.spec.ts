import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailedPageResolver } from './detailed-page.resolver';

describe('detailedPageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedPageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
