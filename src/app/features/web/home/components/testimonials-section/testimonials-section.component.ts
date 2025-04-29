import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faUser,
  faStar
} from '@fortawesome/free-solid-svg-icons';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
  accentColor: string;
}

interface Stat {
  label: string;
  value: string;
  color: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent implements OnInit, OnDestroy {
  // Iconos
  protected faChevronLeft = faChevronLeft;
  protected faChevronRight = faChevronRight;
  protected faUser = faUser;
  protected faStar = faStar;
  
  // Testimonios
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Alejandro Reyes',
      position: 'Desarrollador Full Stack',
      content: 'BlackLine Academy transformó mi carrera. El enfoque práctico y la profundidad técnica de los cursos me dieron habilidades que me diferenciaron inmediatamente en el mercado laboral.',
      rating: 5,
      accentColor: 'cyber-cyan'
    },
    {
      id: 2,
      name: 'Sofía Méndez',
      position: 'Especialista en Ciberseguridad',
      content: 'Lo que más valoro es la comunidad que se forma. Los instructores son profesionales activos y el contenido está constantemente actualizado con las últimas tendencias y vulnerabilidades.',
      rating: 5,
      accentColor: 'critical-red'
    },
    {
      id: 3,
      name: 'Mateo Herrera',
      position: 'Data Scientist',
      content: 'Los laboratorios prácticos y las sesiones de mentoría personalizada marcaron la diferencia. Ahora trabajo con tecnologías de vanguardia gracias a lo aprendido en BlackLine.',
      rating: 4,
      accentColor: 'glitch-green'
    },
    {
      id: 4,
      name: 'Valeria Torres',
      position: 'UX/UI Designer',
      content: 'Encontré un enfoque innovador que va más allá de lo convencional. Las metodologías y ejemplos prácticos me permitieron desarrollar un estilo único que mis clientes adoran.',
      rating: 5,
      accentColor: 'neon-violet'
    },
    {
      id: 5,
      name: 'Diego Morales',
      position: 'Blockchain Developer',
      content: 'Los cursos de blockchain son los más completos que he encontrado. El nivel técnico y la cantidad de proyectos prácticos me permitieron entrar en un campo muy competitivo.',
      rating: 4,
      accentColor: 'pulse-violet'
    }
  ];
  
  // Estadísticas
  stats: Stat[] = [
    { label: 'Tasa de Empleabilidad', value: '94%', color: 'glitch-green' },
    { label: 'Incremento Salarial Promedio', value: '+65%', color: 'cyber-cyan' },
    { label: 'Proyectos Completados', value: '15,000+', color: 'neon-violet' },
    { label: 'Empresas Contratantes', value: '350+', color: 'prisma-amber' }
  ];
  
  // Propiedades del slider
  currentSlide = 0;
  slideOffset = 0;
  slideDots: number[] = [];
  slideInterval: any = null;
  slideWidth = 0;
  visibleSlides = 3;  // Por defecto para pantallas grandes
  
  ngOnInit(): void {
    this.setupSlider();
    this.startAutoSlide();
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', this.onResize);
  }
  
  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    
    window.removeEventListener('resize', this.onResize);
  }
  
  // Configurar el slider
  private setupSlider(): void {
    this.updateVisibleSlides();
    
    // Calcular cuántos dots necesitamos (depende de cuántos slides son visibles a la vez)
    const totalSlides = this.testimonials.length;
    const maxSlides = totalSlides - this.visibleSlides + 1;
    this.slideDots = Array(maxSlides > 0 ? maxSlides : 1).fill(0).map((_, i) => i);
    
    // Calcular el ancho de cada slide
    this.calculateSlideWidth();
  }
  
  // Calcular cuántos slides son visibles según el ancho de pantalla
  private updateVisibleSlides(): void {
    if (window.innerWidth < 768) {
      this.visibleSlides = 1;  // Móvil
    } else if (window.innerWidth < 1024) {
      this.visibleSlides = 2;  // Tablet
    } else {
      this.visibleSlides = 3;  // Desktop
    }
  }
  
  // Calcular el ancho de cada slide
  private calculateSlideWidth(): void {
    const sliderElement = document.querySelector('.testimonials-slider');
    if (sliderElement) {
      this.slideWidth = sliderElement.clientWidth / this.visibleSlides;
      this.updateSlidePosition();
    }
  }
  
  // Actualizar posición del slider
  private updateSlidePosition(): void {
    this.slideOffset = -this.currentSlide * this.slideWidth;
  }
  
  // Ir al slide anterior
  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlidePosition();
      this.resetAutoSlide();
    }
  }
  
  // Ir al siguiente slide
  nextSlide(): void {
    const maxSlide = this.testimonials.length - this.visibleSlides;
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
      this.updateSlidePosition();
      this.resetAutoSlide();
    } else {
      // Volver al principio cuando llegamos al final
      this.currentSlide = 0;
      this.updateSlidePosition();
      this.resetAutoSlide();
    }
  }
  
  // Ir a un slide específico
  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateSlidePosition();
    this.resetAutoSlide();
  }
  
  // Iniciar rotación automática
  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  // Reiniciar rotación automática
  resetAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startAutoSlide();
    }
  }
  
  // Handler para redimensionar ventana
  onResize = (): void => {
    this.updateVisibleSlides();
    this.calculateSlideWidth();
    
    // Recalcular dots
    const totalSlides = this.testimonials.length;
    const maxSlides = totalSlides - this.visibleSlides + 1;
    this.slideDots = Array(maxSlides > 0 ? maxSlides : 1).fill(0).map((_, i) => i);
    
    // Asegurarse de que el slide actual es válido
    if (this.currentSlide >= this.slideDots.length) {
      this.currentSlide = this.slideDots.length - 1;
    }
    
    this.updateSlidePosition();
  }
}