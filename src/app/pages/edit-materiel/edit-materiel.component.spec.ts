import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterielComponent } from './edit-materiel.component';

describe('EditMaterielComponent', () => {
  let component: EditMaterielComponent;
  let fixture: ComponentFixture<EditMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
