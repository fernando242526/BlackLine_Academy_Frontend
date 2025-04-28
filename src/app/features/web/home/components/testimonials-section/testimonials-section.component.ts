import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuoteLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent implements AfterViewInit, OnDestroy {
  // Referencias al carrusel
  @ViewChild('carousel') carouselEl!: ElementRef;
  
  // Iconos
  protected faQuoteLeft = faQuoteLeft;
  protected faChevronLeft = faChevronLeft;
  protected faChevronRight = faChevronRight;
  
  // Estado del carrusel
  activeIndex = 0;
  carouselInterval: any;
  autoplaySpeed = 5000; // 5 segundos
  
  // Testimonios
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Carlos Vega',
      role: 'Ingeniero de Seguridad',
      company: 'CyberShield Inc.',
      image: 'assets/images/testimonials/user1.jpg',
      text: 'BlackLine Academy transformó mi carrera. Los conocimientos de ciberseguridad que adquirí me permitieron conseguir un trabajo mucho mejor remunerado y con mayores desafíos.'
    },
    {
      id: 2,
      name: 'Marina Zhao',
      role: 'Desarrolladora Full Stack',
      company: 'TechNova',
      image: 'assets/images/testimonials/user2.jpg',
      text: 'La metodología de enseñanza es única. A diferencia de otras plataformas, aquí el contenido va directo al grano, sin relleno. Aprendí más en 3 meses que en 2 años de universidad.'
    },
    {
      id: 3,
      name: 'Alejandro Reyes',
      role: 'DevOps Engineer',
      company: 'CloudForge Solutions',
      image: 'assets/images/testimonials/user3.jpg',
      text: 'Los instructores no solo dominan la teoría, sino que comparten experiencias reales del mundo laboral. Esto hace que el aprendizaje sea mucho más práctico y aplicable.'
    },
    {
      id: 4,
      name: 'Sophia Williams',
      role: 'Data Scientist',
      company: 'NeuroData AI',
      image: 'assets/images/testimonials/user4.jpg',
      text: 'La comunidad es increíble. Tener acceso a otros profesionales y mentores me ha abierto muchas puertas. Definitivamente vale cada centavo invertido.'
    }
  ];
  
  ngAfterViewInit() {
    this.startAutoplay();
  }
  
  ngOnDestroy() {
    this.stopAutoplay();
  }
  
  // Iniciar autoplay del carrusel
  startAutoplay() {
    this.carouselInterval = setInterval(() => {
      this.next();
    }, this.autoplaySpeed);
  }
  
  // Detener autoplay
  stopAutoplay() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
  
  // Restablecer el temporizador al interactuar manualmente
  resetTimer() {
    this.stopAutoplay();
    this.startAutoplay();
  }
  
  // Ir al testimonio anterior
  prev() {
    this.activeIndex = this.activeIndex === 0 ? this.testimonials.length - 1 : this.activeIndex - 1;
    this.updateCarousel();
    this.resetTimer();
  }
  
  // Ir al siguiente testimonio
  next() {
    this.activeIndex = this.activeIndex === this.testimonials.length - 1 ? 0 : this.activeIndex + 1;
    this.updateCarousel();
    this.resetTimer();
  }
  
  // Ir a un testimonio específico
  goTo(index: number) {
    this.activeIndex = index;
    this.updateCarousel();
    this.resetTimer();
  }
  
  // Actualizar la posición del carrusel
  private updateCarousel() {
    if (this.carouselEl && this.carouselEl.nativeElement) {
      const translateValue = -this.activeIndex * 100;
      this.carouselEl.nativeElement.style.transform = `translateX(${translateValue}%)`;
    }
  }
}