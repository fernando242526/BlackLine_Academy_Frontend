import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningModelComponent } from './learning-model.component';

describe('LearningModelComponent', () => {
  let component: LearningModelComponent;
  let fixture: ComponentFixture<LearningModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
