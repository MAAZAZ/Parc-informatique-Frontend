import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventionInterneComponent } from './add-intervention-interne.component';

describe('AddInterventionInterneComponent', () => {
  let component: AddInterventionInterneComponent;
  let fixture: ComponentFixture<AddInterventionInterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterventionInterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventionInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
