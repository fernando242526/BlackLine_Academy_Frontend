import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationFaqComponent } from './certification-faq.component';

describe('CertificationFaqComponent', () => {
  let component: CertificationFaqComponent;
  let fixture: ComponentFixture<CertificationFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
