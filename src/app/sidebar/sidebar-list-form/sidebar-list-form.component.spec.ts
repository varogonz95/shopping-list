import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarListFormComponent } from './sidebar-list-form.component';

describe('SidebarListFormComponent', () => {
  let component: SidebarListFormComponent;
  let fixture: ComponentFixture<SidebarListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
