import { TestBed } from '@angular/core/testing';

import { Revenueservice } from './revenueservice';

describe('Revenueservice', () => {
  let service: Revenueservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Revenueservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
