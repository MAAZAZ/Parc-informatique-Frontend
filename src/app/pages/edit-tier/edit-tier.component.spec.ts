import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTierComponent } from './edit-tier.component';

describe('EditTierComponent', () => {
  let component: EditTierComponent;
  let fixture: ComponentFixture<EditTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
