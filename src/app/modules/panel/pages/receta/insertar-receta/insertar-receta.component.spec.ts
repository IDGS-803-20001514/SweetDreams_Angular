import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarRecetaComponent } from './insertar-receta.component';

describe('InsertarRecetaComponent', () => {
  let component: InsertarRecetaComponent;
  let fixture: ComponentFixture<InsertarRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertarRecetaComponent]
    });
    fixture = TestBed.createComponent(InsertarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
