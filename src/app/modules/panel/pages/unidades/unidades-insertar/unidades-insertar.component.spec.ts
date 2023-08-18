import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesInsertarComponent } from './unidades-insertar.component';

describe('UnidadesInsertarComponent', () => {
  let component: UnidadesInsertarComponent;
  let fixture: ComponentFixture<UnidadesInsertarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesInsertarComponent]
    });
    fixture = TestBed.createComponent(UnidadesInsertarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
