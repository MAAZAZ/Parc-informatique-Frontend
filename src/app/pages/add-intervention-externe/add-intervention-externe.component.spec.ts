import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventionExterneComponent } from './add-intervention-externe.component';

describe('AddInterventionExterneComponent', () => {
  let component: AddInterventionExterneComponent;
  let fixture: ComponentFixture<AddInterventionExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterventionExterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventionExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
