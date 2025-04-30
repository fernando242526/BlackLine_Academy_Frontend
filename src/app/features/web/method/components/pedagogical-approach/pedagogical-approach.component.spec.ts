import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedagogicalApproachComponent } from './pedagogical-approach.component';

describe('PedagogicalApproachComponent', () => {
  let component: PedagogicalApproachComponent;
  let fixture: ComponentFixture<PedagogicalApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedagogicalApproachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedagogicalApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
