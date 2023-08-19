import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSalidasComponent } from './insert-salidas.component';

describe('InsertSalidasComponent', () => {
  let component: InsertSalidasComponent;
  let fixture: ComponentFixture<InsertSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertSalidasComponent]
    });
    fixture = TestBed.createComponent(InsertSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
