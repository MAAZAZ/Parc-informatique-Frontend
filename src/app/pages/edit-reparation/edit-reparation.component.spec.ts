import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReparationComponent } from './edit-reparation.component';

describe('EditReparationComponent', () => {
  let component: EditReparationComponent;
  let fixture: ComponentFixture<EditReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
