import { TestBed } from '@angular/core/testing';

import { FirebaseCRUDService } from './firebase-crud.service';

describe('FirebaseCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseCRUDService = TestBed.get(FirebaseCRUDService);
    expect(service).toBeTruthy();
  });
});
