import { TestBed } from '@angular/core/testing';

import { DepartamentoServicesService } from './departamento-services.service';

describe('DepartamentoServicesService', () => {
  let service: DepartamentoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
