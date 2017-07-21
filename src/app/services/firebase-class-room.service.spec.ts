import { TestBed, inject } from '@angular/core/testing';

import { FirebaseClassRoomService } from './firebase-class-room.service';

describe('FirebaseClassRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseClassRoomService]
    });
  });

  it('should be created', inject([FirebaseClassRoomService], (service: FirebaseClassRoomService) => {
    expect(service).toBeTruthy();
  }));
});
