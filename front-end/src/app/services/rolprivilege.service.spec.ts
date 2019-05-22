import { TestBed } from '@angular/core/testing';

import { RolprivilegeService } from './rolprivilege.service';

describe('RolprivilegeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolprivilegeService = TestBed.get(RolprivilegeService);
    expect(service).toBeTruthy();
  });
});
