import { TestBed } from '@angular/core/testing';

import { TierpublicService } from './tierpublic.service';

describe('TierpublicService', () => {
  let service: TierpublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TierpublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
