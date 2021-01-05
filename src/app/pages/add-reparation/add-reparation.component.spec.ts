import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReparationComponent } from './add-reparation.component';

describe('AddReparationComponent', () => {
  let component: AddReparationComponent;
  let fixture: ComponentFixture<AddReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
