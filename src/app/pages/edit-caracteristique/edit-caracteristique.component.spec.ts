import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaracteristiqueComponent } from './edit-caracteristique.component';

describe('EditCaracteristiqueComponent', () => {
  let component: EditCaracteristiqueComponent;
  let fixture: ComponentFixture<EditCaracteristiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaracteristiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaracteristiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
