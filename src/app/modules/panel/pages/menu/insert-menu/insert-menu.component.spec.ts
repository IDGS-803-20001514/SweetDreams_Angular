import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMenuComponent } from './insert-menu.component';

describe('InsertMenuComponent', () => {
  let component: InsertMenuComponent;
  let fixture: ComponentFixture<InsertMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertMenuComponent]
    });
    fixture = TestBed.createComponent(InsertMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
