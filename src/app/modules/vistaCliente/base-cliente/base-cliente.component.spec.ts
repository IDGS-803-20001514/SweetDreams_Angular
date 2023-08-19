import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseClienteComponent } from './base-cliente.component';

describe('BaseClienteComponent', () => {
  let component: BaseClienteComponent;
  let fixture: ComponentFixture<BaseClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseClienteComponent]
    });
    fixture = TestBed.createComponent(BaseClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
