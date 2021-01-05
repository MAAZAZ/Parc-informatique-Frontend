import { TestBed } from '@angular/core/testing';

import { ReclamationpublicService } from './reclamationpublic.service';

describe('ReclamationpublicService', () => {
  let service: ReclamationpublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationpublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
