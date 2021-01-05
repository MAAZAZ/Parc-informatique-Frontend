import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationpublicComponent } from './reparationpublic.component';

describe('ReparationpublicComponent', () => {
  let component: ReparationpublicComponent;
  let fixture: ComponentFixture<ReparationpublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationpublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
