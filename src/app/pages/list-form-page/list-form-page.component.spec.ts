import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormPage } from './list-form-page.component';

describe('NewListPageComponent', () => {
  let component: ListFormPage;
  let fixture: ComponentFixture<ListFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
