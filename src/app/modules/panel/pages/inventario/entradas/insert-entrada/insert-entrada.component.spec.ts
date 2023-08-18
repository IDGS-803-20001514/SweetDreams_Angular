import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEntradaComponent } from './insert-entrada.component';

describe('InsertEntradaComponent', () => {
  let component: InsertEntradaComponent;
  let fixture: ComponentFixture<InsertEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertEntradaComponent]
    });
    fixture = TestBed.createComponent(InsertEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
