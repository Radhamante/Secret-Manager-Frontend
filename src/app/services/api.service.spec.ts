import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { setupGlobalProviders } from '../../../test-setup';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    setupGlobalProviders();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
