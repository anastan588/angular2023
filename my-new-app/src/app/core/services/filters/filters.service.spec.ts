import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Store } from '@ngrx/store';

class MockHttpClient {
  // Implement a mock version of _HttpClient
}

describe('FiltersService', () => {
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FiltersService,
        ApiService,
        HttpClient,
        HttpHandler,
        { provide: '_HttpClient', useClass: MockHttpClient },
        { provide: Store, useValue: { select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),} },
      ],
    });
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
