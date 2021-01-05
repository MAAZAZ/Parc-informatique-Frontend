import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationPublicComponent } from './reclamation-public.component';

describe('ReclamationPublicComponent', () => {
  let component: ReclamationPublicComponent;
  let fixture: ComponentFixture<ReclamationPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
