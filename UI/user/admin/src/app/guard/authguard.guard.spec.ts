import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authguardGuard } from './authguard.guard';

describe('authguardGuard', () => {
  let guard: authguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
