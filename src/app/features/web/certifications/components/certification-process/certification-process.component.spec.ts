import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationProcessComponent } from './certification-process.component';

describe('CertificationProcessComponent', () => {
  let component: CertificationProcessComponent;
  let fixture: ComponentFixture<CertificationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
