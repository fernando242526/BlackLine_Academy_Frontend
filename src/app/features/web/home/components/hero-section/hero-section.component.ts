import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRocket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ParticleBackgroundComponent } from '../../../../../shared/components/particle-background/particle-background.component';

interface Statistic {
  value: number;
  displayValue: string;
  label: string;
  color: string;
  increment: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ParticleBackgroundComponent
  ],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  // Iconos
  protected faRocket = faRocket;
  protected faUserPlus = faUserPlus;
  
  // Estadísticas con animación de contador
  statistics: Statistic[] = [
    { value: 5000, displayValue: '0', label: 'Estudiantes Activos', color: 'cyber-cyan', increment: 250 },
    { value: 120, displayValue: '0', label: 'Cursos Disponibles', color: 'neon-violet', increment: 5 },
    { value: 98, displayValue: '0', label: 'Tasa de Satisfacción', color: 'glitch-green', increment: 5 },
    { value: 50, displayValue: '0', label: 'Mentores Expertos', color: 'prisma-amber', increment: 2 }
  ];
  
  // Variables para animación de contador
  private animationFrameId: number | null = null;
  private animated = false;
  private observer: IntersectionObserver | null = null;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    // Configurar observer para animar los contadores cuando la sección sea visible
    this.setupIntersectionObserver();
  }
  
  ngOnDestroy(): void {
    // Limpiar observer y cancelar animaciones
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.animateCounters();
        }
      });
    }, { threshold: 0.2 });
    
    // Observar la sección de estadísticas
    setTimeout(() => {
      const statsElements = document.querySelectorAll('.animate-value');
      if (statsElements.length) {
        statsElements.forEach(el => {
          if (this.observer) {
            this.observer.observe(el);
          }
        });
      } else {
        // Si no encuentra los elementos, iniciar la animación después de un tiempo
        setTimeout(() => {
          this.animateCounters();
        }, 2000);
      }
    }, 500);
  }
  
  private animateCounters(): void {
    const countUp = () => {
      let allComplete = true;
      
      this.statistics = this.statistics.map(stat => {
        const current = parseInt(stat.displayValue.replace(/[^0-9]/g, ''), 10);
        
        if (current < stat.value) {
          allComplete = false;
          
          // Incrementar el valor mostrado
          const newValue = Math.min(current + stat.increment, stat.value);
          let displayValue = newValue.toString();
          
          // Agregar simbolo "+" si es necesario
          if (stat.label.includes('Estudiantes') || stat.label.includes('Cursos') || stat.label.includes('Mentores')) {
            displayValue += '+';
          }
          
          // Agregar símbolo "%" si es necesario
          if (stat.label.includes('Satisfacción')) {
            displayValue += '%';
          }
          
          return { ...stat, displayValue };
        }
        
        return stat;
      });
      
      this.cdr.detectChanges();
      
      if (!allComplete) {
        this.animationFrameId = requestAnimationFrame(countUp);
      }
    };
    
    countUp();
  }
}