import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClienteMenuComponent } from './vista-cliente-menu.component';

describe('VistaClienteMenuComponent', () => {
  let component: VistaClienteMenuComponent;
  let fixture: ComponentFixture<VistaClienteMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaClienteMenuComponent]
    });
    fixture = TestBed.createComponent(VistaClienteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
