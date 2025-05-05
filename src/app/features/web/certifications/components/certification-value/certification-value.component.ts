import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBriefcase, 
  faNetworkWired, 
  faTrophy, 
  faChartLine, 
  faShieldHalved, 
  faGlobe 
} from '@fortawesome/free-solid-svg-icons';

interface ValuePoint {
  icon: any;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-certification-value',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './certification-value.component.html',
  styleUrl: './certification-value.component.scss'
})
export class CertificationValueComponent {
  // Iconos
  protected faBriefcase = faBriefcase;
  protected faNetworkWired = faNetworkWired;
  protected faTrophy = faTrophy;
  protected faChartLine = faChartLine;
  protected faShieldHalved = faShieldHalved;
  protected faGlobe = faGlobe;
  
  // Puntos de valor de las certificaciones
  valuePoints: ValuePoint[] = [
    {
      icon: faBriefcase,
      title: 'Acceso Exclusivo a Empleo',
      description: 'Las certificaciones BlackLine abren puertas a oportunidades laborales de alto nivel y proyectos exclusivos en compañías líderes.',
      color: 'cyber-cyan'
    },
    {
      icon: faNetworkWired,
      title: 'Red Profesional Elite',
      description: 'Únete a una comunidad selecta de profesionales certificados con acceso a eventos privados y colaboraciones de alto impacto.',
      color: 'neon-violet'
    },
    {
      icon: faTrophy,
      title: 'Validación de Competencias',
      description: 'Demuestra tu dominio de habilidades avanzadas con un respaldo técnico reconocido en la industria tecnológica.',
      color: 'glitch-green'
    },
    {
      icon: faChartLine,
      title: 'Aumento de Salario',
      description: 'Profesionales con certificaciones BlackLine reportan incrementos salariales del 45-70% después de obtener sus credenciales.',
      color: 'neon-copper'
    },
    {
      icon: faShieldHalved,
      title: 'Credencial Verificable',
      description: 'Certificación digital almacenada en blockchain, imposible de falsificar y fácil de verificar por empleadores globales.',
      color: 'critical-red'
    },
    {
      icon: faGlobe,
      title: 'Reconocimiento Internacional',
      description: 'Respaldo profesional valorado en más de 40 países y reconocido por las principales empresas tecnológicas del mundo.',
      color: 'pulse-violet'
    }
  ];
}