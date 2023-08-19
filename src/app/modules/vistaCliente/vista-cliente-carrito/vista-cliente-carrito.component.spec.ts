import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClienteCarritoComponent } from './vista-cliente-carrito.component';

describe('VistaClienteCarritoComponent', () => {
  let component: VistaClienteCarritoComponent;
  let fixture: ComponentFixture<VistaClienteCarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaClienteCarritoComponent]
    });
    fixture = TestBed.createComponent(VistaClienteCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
