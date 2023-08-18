import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProveedorComponent } from './update-proveedor.component';

describe('UpdateProveedorComponent', () => {
  let component: UpdateProveedorComponent;
  let fixture: ComponentFixture<UpdateProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProveedorComponent]
    });
    fixture = TestBed.createComponent(UpdateProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
