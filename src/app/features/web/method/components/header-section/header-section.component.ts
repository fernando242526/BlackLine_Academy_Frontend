import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCode, faTerminal, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ParticleBackgroundComponent } from '../../../../../shared/components/particle-background/particle-background.component';

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ParticleBackgroundComponent
  ],
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent {
  // Iconos
  protected faCode = faCode;
  protected faTerminal = faTerminal;
  protected faChevronDown = faChevronDown;
  
  // Características clave de nuestra metodología 
  methodFeatures = [
    {
      title: 'Aprendizaje Experimental',
      description: 'Aprendizaje a través de proyectos prácticos del mundo real.',
      icon: faCode,
      color: 'cyber-cyan'
    },
    {
      title: 'Adaptación Continua',
      description: 'Metodología adaptada a las necesidades individuales.',
      icon: faTerminal,
      color: 'neon-violet'
    },
    {
      title: 'Comunidad Colaborativa',
      description: 'Formación de una comunidad de aprendizaje activa.',
      icon: faCode,
      color: 'glitch-green'
    }
  ];
}