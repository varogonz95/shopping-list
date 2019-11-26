import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditsPage } from './credits-page.component';

describe('CreditsPage', () => {
  let component: CreditsPage;
  let fixture: ComponentFixture<CreditsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
