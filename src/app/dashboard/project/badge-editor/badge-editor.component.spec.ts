import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeEditorComponent } from './badge-editor.component';

describe('BadgeEditorComponent', () => {
  let component: BadgeEditorComponent;
  let fixture: ComponentFixture<BadgeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
