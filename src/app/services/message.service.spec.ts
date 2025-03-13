import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { setupGlobalProviders } from '../../../test-setup';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    setupGlobalProviders();
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
