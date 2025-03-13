import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { setupGlobalProviders } from '../../../test-setup';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    setupGlobalProviders();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
