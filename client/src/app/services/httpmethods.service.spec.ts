import { TestBed } from '@angular/core/testing';

import { HttpmethodsService } from './httpmethods.service';

describe('HttpmethodsService', () => {
  let service: HttpmethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpmethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
