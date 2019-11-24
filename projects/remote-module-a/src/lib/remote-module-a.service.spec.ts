import { TestBed } from '@angular/core/testing';

import { RemoteModuleAService } from './remote-module-a.service';

describe('RemoteModuleAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoteModuleAService = TestBed.get(RemoteModuleAService);
    expect(service).toBeTruthy();
  });
});
