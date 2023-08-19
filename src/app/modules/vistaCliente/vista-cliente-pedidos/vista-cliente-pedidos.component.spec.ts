import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClientePedidosComponent } from './vista-cliente-pedidos.component';

describe('VistaClientePedidosComponent', () => {
  let component: VistaClientePedidosComponent;
  let fixture: ComponentFixture<VistaClientePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaClientePedidosComponent]
    });
    fixture = TestBed.createComponent(VistaClientePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
