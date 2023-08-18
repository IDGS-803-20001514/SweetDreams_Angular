import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarIngredienteComponent } from './actualizar-ingrediente.component';

describe('ActualizarIngredienteComponent', () => {
  let component: ActualizarIngredienteComponent;
  let fixture: ComponentFixture<ActualizarIngredienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarIngredienteComponent]
    });
    fixture = TestBed.createComponent(ActualizarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
