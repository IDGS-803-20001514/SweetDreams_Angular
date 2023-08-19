import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCompraComponent } from './actualizar-compra.component';

describe('ActualizarCompraComponent', () => {
  let component: ActualizarCompraComponent;
  let fixture: ComponentFixture<ActualizarCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarCompraComponent]
    });
    fixture = TestBed.createComponent(ActualizarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
