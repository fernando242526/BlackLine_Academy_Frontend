import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaborativeLearningComponent } from './collaborative-learning.component';



describe('ColaborativeLearningComponent', () => {
  let component: CollaborativeLearningComponent;
  let fixture: ComponentFixture<CollaborativeLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaborativeLearningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborativeLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
