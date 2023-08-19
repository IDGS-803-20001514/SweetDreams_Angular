import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarCompraComponent } from './insertar-compra.component';

describe('InsertarCompraComponent', () => {
  let component: InsertarCompraComponent;
  let fixture: ComponentFixture<InsertarCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertarCompraComponent]
    });
    fixture = TestBed.createComponent(InsertarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
