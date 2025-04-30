import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalTechComponent } from './educational-tech.component';

describe('EducationalTechComponent', () => {
  let component: EducationalTechComponent;
  let fixture: ComponentFixture<EducationalTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
