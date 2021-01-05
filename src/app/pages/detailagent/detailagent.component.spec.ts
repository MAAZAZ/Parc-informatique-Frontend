import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailagentComponent } from './detailagent.component';

describe('DetailagentComponent', () => {
  let component: DetailagentComponent;
  let fixture: ComponentFixture<DetailagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
