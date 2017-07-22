import { TestBed, inject } from '@angular/core/testing';

import { FirebaseMastItemService } from './firebase-mast-item.service';

describe('FirebaseMastItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseMastItemService]
    });
  });

  it('should be created', inject([FirebaseMastItemService], (service: FirebaseMastItemService) => {
    expect(service).toBeTruthy();
  }));
});
