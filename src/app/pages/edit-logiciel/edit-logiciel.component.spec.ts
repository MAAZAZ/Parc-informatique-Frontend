import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogicielComponent } from './edit-logiciel.component';

describe('EditLogicielComponent', () => {
  let component: EditLogicielComponent;
  let fixture: ComponentFixture<EditLogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLogicielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
