import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationHeaderComponent } from './certification-header.component';

describe('CertificationHeaderComponent', () => {
  let component: CertificationHeaderComponent;
  let fixture: ComponentFixture<CertificationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
