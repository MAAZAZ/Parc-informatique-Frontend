import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogicielComponent } from './add-logiciel.component';

describe('AddLogicielComponent', () => {
  let component: AddLogicielComponent;
  let fixture: ComponentFixture<AddLogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLogicielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
