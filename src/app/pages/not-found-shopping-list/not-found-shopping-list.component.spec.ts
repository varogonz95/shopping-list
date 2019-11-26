import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundShoppingListPage } from './not-found-shopping-list.component';

describe('NotFoundShoppingListComponent', () => {
  let component: NotFoundShoppingListPage;
  let fixture: ComponentFixture<NotFoundShoppingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundShoppingListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
