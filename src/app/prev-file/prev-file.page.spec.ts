import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrevFilePage } from './prev-file.page';

describe('PrevFilePage', () => {
  let component: PrevFilePage;
  let fixture: ComponentFixture<PrevFilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
