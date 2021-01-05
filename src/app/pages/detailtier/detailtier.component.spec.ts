import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailtierComponent } from './detailtier.component';

describe('DetailtierComponent', () => {
  let component: DetailtierComponent;
  let fixture: ComponentFixture<DetailtierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailtierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
