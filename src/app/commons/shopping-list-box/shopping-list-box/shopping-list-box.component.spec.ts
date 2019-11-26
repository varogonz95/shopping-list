import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListBoxComponent } from './shopping-list-box.component';

describe('ShoppingListBoxComponent', () => {
  let component: ShoppingListBoxComponent;
  let fixture: ComponentFixture<ShoppingListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
