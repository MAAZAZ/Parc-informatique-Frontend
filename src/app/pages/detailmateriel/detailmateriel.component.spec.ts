import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmaterielComponent } from './detailmateriel.component';

describe('DetailmaterielComponent', () => {
  let component: DetailmaterielComponent;
  let fixture: ComponentFixture<DetailmaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailmaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
