import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptabilityComponent } from './adaptability.component';

describe('AdaptabilityComponent', () => {
  let component: AdaptabilityComponent;
  let fixture: ComponentFixture<AdaptabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaptabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaptabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
