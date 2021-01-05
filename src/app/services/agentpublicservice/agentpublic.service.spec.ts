import { TestBed } from '@angular/core/testing';

import { AgentpublicService } from './agentpublic.service';

describe('AgentpublicService', () => {
  let service: AgentpublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentpublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
