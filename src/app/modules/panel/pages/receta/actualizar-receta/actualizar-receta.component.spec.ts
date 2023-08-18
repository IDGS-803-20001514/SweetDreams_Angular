import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRecetaComponent } from './actualizar-receta.component';

describe('ActualizarRecetaComponent', () => {
  let component: ActualizarRecetaComponent;
  let fixture: ComponentFixture<ActualizarRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarRecetaComponent]
    });
    fixture = TestBed.createComponent(ActualizarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
