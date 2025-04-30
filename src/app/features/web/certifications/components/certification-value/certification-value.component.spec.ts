import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationValueComponent } from './certification-value.component';

describe('CertificationValueComponent', () => {
  let component: CertificationValueComponent;
  let fixture: ComponentFixture<CertificationValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
