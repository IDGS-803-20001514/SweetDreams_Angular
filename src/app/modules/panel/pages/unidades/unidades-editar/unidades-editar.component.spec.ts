import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesEditarComponent } from './unidades-editar.component';

describe('UnidadesEditarComponent', () => {
  let component: UnidadesEditarComponent;
  let fixture: ComponentFixture<UnidadesEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesEditarComponent]
    });
    fixture = TestBed.createComponent(UnidadesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
