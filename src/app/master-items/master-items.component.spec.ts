import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterItemsComponent } from './master-items.component';

describe('MasterItemsComponent', () => {
  let component: MasterItemsComponent;
  let fixture: ComponentFixture<MasterItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
