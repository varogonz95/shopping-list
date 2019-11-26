import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShoppingListBoxComponent } from './add-shopping-list-box.component';

describe('AddShoppingListBoxComponent', () => {
  let component: AddShoppingListBoxComponent;
  let fixture: ComponentFixture<AddShoppingListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShoppingListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShoppingListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
