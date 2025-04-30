import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAward,
  faCertificate,
  faShield,
  faGraduationCap,
  faRocket,
  faLaptopCode,
  faBrain,
  faServer,
  faChevronRight,
  faChartLine,
  faUserCheck,
  faCheckCircle,
  faCodeBranch,
  faDatabase,
  faLock
} from '@fortawesome/free-solid-svg-icons';

// Importación de componentes
import { CertificationHeaderComponent } from './components/certification-header/certification-header.component';
import { CertificationCardComponent } from './components/certification-card/certification-card.component';
import { CertificationProcessComponent } from './components/certification-process/certification-process.component';
import { CertificationValueComponent } from './components/certification-value/certification-value.component';
import { CertificationFaqComponent } from './components/certification-faq/certification-faq.component';
import { CtaComponent } from './components/cta/cta.component';

/**
 * Interfaz para las certificaciones
 */
interface Certification {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: any; // FontAwesome icon
  color: string; // Color del tema
  duration: string;
  level: string;
  levelColor: string;
  price: number;
  discountPrice?: number;
  industries: string[];
  requirements: string[];
  badge: string; // URL de la imagen del badge
  featured?: boolean;
  new?: boolean;
  popular?: boolean;
  categories: string[];
}

/**
 * Componente principal para la página de certificaciones
 */
@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    CertificationHeaderComponent,
    CertificationCardComponent,
    CertificationProcessComponent,
    CertificationValueComponent,
    CertificationFaqComponent,
    CtaComponent
  ],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export default class CertificationsComponent {
  // Iconos
  protected faAward = faAward;
  protected faCertificate = faCertificate;
  protected faChevronRight = faChevronRight;
  protected faChartLine = faChartLine;
  protected faUserCheck = faUserCheck;
  
  // Estado del filtro
  protected activeCategory = signal<string | null>(null);
  
  // Categorías de certificaciones
  protected categories = [
    { id: 'all', name: 'Todas' },
    { id: 'dev', name: 'Desarrollo' },
    { id: 'security', name: 'Ciberseguridad' },
    { id: 'data', name: 'Datos' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'ai', name: 'IA' }
  ];
  
  // Datos de las certificaciones
  protected certifications: Certification[] = [
    {
      id: '1',
      title: 'CyberGuard Security Specialist',
      slug: 'cyberguard-security-specialist',
      description: 'Conviértete en un especialista en seguridad cibernética con conocimientos avanzados en protección de sistemas, pentesting y respuesta a incidentes.',
      icon: faShield,
      color: 'neon-violet',
      duration: '12 semanas',
      level: 'Avanzado',
      levelColor: 'neon-violet',
      price: 899,
      discountPrice: 699,
      industries: ['Ciberseguridad', 'Consultoría IT', 'Finanzas'],
      requirements: ['Conocimientos básicos de redes', 'Fundamentos de sistemas operativos', 'Experiencia básica en seguridad'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=Security+Badge',
      featured: true,
      popular: true,
      categories: ['security']
    },
    {
      id: '2',
      title: 'Full-Stack Developer Master',
      slug: 'fullstack-developer-master',
      description: 'Domina el desarrollo web completo con tecnologías modernas. Aprende frontend, backend, bases de datos y despliegue en la nube.',
      icon: faLaptopCode,
      color: 'cyber-cyan',
      duration: '16 semanas',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      price: 1299,
      discountPrice: 999,
      industries: ['Desarrollo Web', 'Startups', 'E-commerce'],
      requirements: ['Conocimientos básicos de programación', 'HTML/CSS fundamentales', 'Lógica de programación'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=Fullstack+Badge',
      featured: true,
      categories: ['dev']
    },
    {
      id: '3',
      title: 'AI Engineer Specialist',
      slug: 'ai-engineer-specialist',
      description: 'Especialízate en inteligencia artificial y machine learning. Aprende a diseñar, implementar y optimizar modelos de IA para problemas reales.',
      icon: faBrain,
      color: 'glitch-green',
      duration: '14 semanas',
      level: 'Avanzado',
      levelColor: 'neon-violet',
      price: 1499,
      discountPrice: 1199,
      industries: ['Inteligencia Artificial', 'Investigación', 'Tecnología'],
      requirements: ['Programación en Python', 'Conocimientos de estadística', 'Álgebra lineal básica'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=AI+Badge',
      new: true,
      categories: ['ai', 'data']
    },
    {
      id: '4',
      title: 'Cloud Architecture Professional',
      slug: 'cloud-architecture-professional',
      description: 'Conviértete en un arquitecto cloud y diseña infraestructuras escalables, seguras y eficientes en los principales proveedores de nube.',
      icon: faServer,
      color: 'electric-blue',
      duration: '10 semanas',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      price: 999,
      industries: ['Cloud Computing', 'DevOps', 'Infraestructura IT'],
      requirements: ['Conocimientos de redes', 'Sistemas operativos', 'Conceptos básicos de cloud'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=Cloud+Badge',
      popular: true,
      categories: ['cloud']
    },
    {
      id: '5',
      title: 'Data Science Expert',
      slug: 'data-science-expert',
      description: 'Aprende a extraer valor de los datos mediante análisis avanzado, visualización y machine learning aplicado a problemas de negocio.',
      icon: faDatabase,
      color: 'prisma-amber',
      duration: '14 semanas',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      price: 1199,
      discountPrice: 949,
      industries: ['Business Intelligence', 'Finanzas', 'Marketing'],
      requirements: ['Estadística básica', 'Programación básica', 'Análisis de datos'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=Data+Badge',
      new: true,
      categories: ['data']
    },
    {
      id: '6',
      title: 'Cybersecurity Ethical Hacker',
      slug: 'cybersecurity-ethical-hacker',
      description: 'Especialízate en técnicas avanzadas de hacking ético para identificar vulnerabilidades y proteger sistemas críticos.',
      icon: faLock,
      color: 'critical-red',
      duration: '12 semanas',
      level: 'Experto',
      levelColor: 'critical-red',
      price: 1399,
      discountPrice: 1099,
      industries: ['Seguridad Informática', 'Banca', 'Defensa'],
      requirements: ['Conocimientos de seguridad', 'Redes avanzadas', 'Experiencia en pentesting'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=Hacker+Badge',
      popular: true,
      categories: ['security']
    },
    {
      id: '7',
      title: 'DevOps Engineer Professional',
      slug: 'devops-engineer-professional',
      description: 'Domina la integración y despliegue continuo con herramientas modernas de DevOps para optimizar el ciclo de desarrollo de software.',
      icon: faCodeBranch,
      color: 'soft-cyan',
      duration: '10 semanas',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      price: 1099,
      discountPrice: 899,
      industries: ['DevOps', 'Startups', 'Servicios Cloud'],
      requirements: ['Conocimientos de Linux', 'Desarrollo de software', 'Conceptos de CI/CD'],
      badge: 'https://placehold.co/300x300/292d35/e0e0e0?text=DevOps+Badge',
      featured: false,
      categories: ['dev', 'cloud']
    }
  ];
  
  // Estadísticas de valor
  protected valueStats = [
    { value: '35%', label: 'Incremento salarial promedio', icon: faChartLine },
    { value: '87%', label: 'Tasa de empleabilidad', icon: faUserCheck },
    { value: '96%', label: 'Reconocimiento en la industria', icon: faAward }
  ];

  // Métodos
  
  /**
   * Filtra las certificaciones por categoría
   */
  protected filterByCategory(categoryId: string | null): void {
    this.activeCategory.set(categoryId);
  }
  
  /**
   * Obtiene las certificaciones filtradas según la categoría seleccionada
   */
  protected get filteredCertifications(): Certification[] {
    const category = this.activeCategory();
    
    if (!category || category === 'all') {
      return this.certifications;
    }
    
    return this.certifications.filter(cert => 
      cert.categories.includes(category)
    );
  }
  
  /**
   * Calcula el porcentaje de descuento
   */
  protected getDiscountPercentage(originalPrice: number, discountPrice: number): number {
    return Math.round(100 - (discountPrice / originalPrice * 100));
  }
}