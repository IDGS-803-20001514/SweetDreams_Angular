import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClientePagosComponent } from './vista-cliente-pagos.component';

describe('VistaClientePagosComponent', () => {
  let component: VistaClientePagosComponent;
  let fixture: ComponentFixture<VistaClientePagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaClientePagosComponent]
    });
    fixture = TestBed.createComponent(VistaClientePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
