import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarClienteComponent } from './insertar-cliente.component';

describe('InsertarClienteComponent', () => {
  let component: InsertarClienteComponent;
  let fixture: ComponentFixture<InsertarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertarClienteComponent]
    });
    fixture = TestBed.createComponent(InsertarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
