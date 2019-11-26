import { TestBed } from '@angular/core/testing';

import { AuthProtectService } from './auth-protect.service';

describe('AuthProtectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthProtectService = TestBed.get(AuthProtectService);
    expect(service).toBeTruthy();
  });
});
