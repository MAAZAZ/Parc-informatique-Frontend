import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillogicielComponent } from './detaillogiciel.component';

describe('DetaillogicielComponent', () => {
  let component: DetaillogicielComponent;
  let fixture: ComponentFixture<DetaillogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillogicielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
