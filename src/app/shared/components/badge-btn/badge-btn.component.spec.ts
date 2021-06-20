import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeBtnComponent } from './badge-btn.component';

describe('BadgeBtnComponent', () => {
  let component: BadgeBtnComponent;
  let fixture: ComponentFixture<BadgeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
