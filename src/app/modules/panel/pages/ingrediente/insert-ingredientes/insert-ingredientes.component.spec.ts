import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertIngredientesComponent } from './insert-ingredientes.component';

describe('InsertIngredientesComponent', () => {
  let component: InsertIngredientesComponent;
  let fixture: ComponentFixture<InsertIngredientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertIngredientesComponent]
    });
    fixture = TestBed.createComponent(InsertIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
