import { TestBed } from '@angular/core/testing';

import { IngredienteServicesService } from './ingrediente-services.service';

describe('IngredienteServicesService', () => {
  let service: IngredienteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredienteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
