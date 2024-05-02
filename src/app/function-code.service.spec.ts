import { TestBed } from '@angular/core/testing';

import { FunctionCodeService } from './function-code.service';

describe('FunctionCodeService', () => {
  let service: FunctionCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
