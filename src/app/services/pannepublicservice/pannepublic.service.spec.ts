import { TestBed } from '@angular/core/testing';

import { PannepublicService } from './pannepublic.service';

describe('PannepublicService', () => {
  let service: PannepublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PannepublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
