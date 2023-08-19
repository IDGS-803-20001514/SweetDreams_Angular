import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClientePerfilComponent } from './vista-cliente-perfil.component';

describe('VistaClientePerfilComponent', () => {
  let component: VistaClientePerfilComponent;
  let fixture: ComponentFixture<VistaClientePerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaClientePerfilComponent]
    });
    fixture = TestBed.createComponent(VistaClientePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
