import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassItemsComponent } from './class-items.component';

describe('ClassItemsComponent', () => {
  let component: ClassItemsComponent;
  let fixture: ComponentFixture<ClassItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
