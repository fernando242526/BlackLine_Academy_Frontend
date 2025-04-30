import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingStrategiesComponent } from './teaching-strategies.component';

describe('TeachingStrategiesComponent', () => {
  let component: TeachingStrategiesComponent;
  let fixture: ComponentFixture<TeachingStrategiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachingStrategiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingStrategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
