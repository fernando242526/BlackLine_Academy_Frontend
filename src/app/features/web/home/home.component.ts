import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { CourseShowcaseComponent } from './components/course-showcase/course-showcase.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    FeaturesSectionComponent,
    CourseShowcaseComponent,
    TestimonialsSectionComponent,
    CtaSectionComponent
  ],
  templateUrl: './home.component.html'
})
export default class HomeComponent {}