import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
  id: string;
}

@Component({
  selector: 'app-certification-faq',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './certification-faq.component.html',
  styleUrl: './certification-faq.component.scss'
})
export class CertificationFaqComponent {
  // Iconos
  protected faChevronDown = faChevronDown;
  protected faChevronUp = faChevronUp;
  
  // Estado para los items de FAQ
  activeItem = signal<string | null>(null);
  
  // Preguntas frecuentes
  faqItems: FaqItem[] = [
    {
      id: 'prerequisites',
      question: '¿Qué requisitos previos necesito para una certificación BlackLine?',
      answer: 'Cada certificación tiene requisitos específicos, pero generalmente se recomienda experiencia previa en el área (1-2 años) y conocimientos fundamentales. Para certificaciones avanzadas, se requiere completar primero las certificaciones básicas correspondientes o demostrar experiencia profesional equivalente. El equipo de admisiones puede evaluar tu caso específico.'
    },
    {
      id: 'duration',
      question: '¿Cuánto tiempo toma completar una certificación?',
      answer: 'El tiempo promedio varía según el nivel y tipo de certificación. Las certificaciones básicas pueden completarse en 2-3 meses con dedicación parcial. Las certificaciones avanzadas toman entre 4-6 meses, incluyendo el desarrollo del proyecto práctico. El proceso está diseñado para ser flexible y adaptarse a tu ritmo, con un límite máximo de 12 meses para completar el programa.'
    },
    {
      id: 'difference',
      question: '¿En qué se diferencian las certificaciones BlackLine de otras del mercado?',
      answer: 'Las certificaciones BlackLine se distinguen por: 1) Enfoque práctico con proyectos reales evaluados por expertos, 2) Validación mediante blockchain, 3) Comunidad exclusiva de profesionales certificados, 4) Actualización constante de contenidos, 5) Reconocimiento en empresas tecnológicas líderes y 6) Enfoque en tecnologías emergentes y habilidades de vanguardia que pocas certificaciones tradicionales cubren.'
    },
    {
      id: 'exam',
      question: '¿Cómo es el formato de los exámenes y evaluaciones?',
      answer: 'Nuestro sistema de evaluación es multidimensional. Incluye: 1) Pruebas técnicas automatizadas que evalúan conocimientos teóricos, 2) Desarrollo de un proyecto práctico en condiciones reales, 3) Defensa del proyecto ante un panel de expertos, y 4) Evaluación de habilidades blandas como comunicación técnica. Este enfoque integral garantiza que los certificados no solo conocen la teoría, sino que pueden aplicarla efectivamente.'
    },
    {
      id: 'renewal',
      question: '¿Las certificaciones tienen fecha de vencimiento?',
      answer: 'Sí, las certificaciones BlackLine tienen una validez de 3 años. Para mantenerla activa, puedes elegir entre: 1) Completar un proyecto de actualización más breve, 2) Aprobar un examen de renovación con los nuevos contenidos añadidos, o 3) Acreditar experiencia profesional relevante y continua en el campo. Este proceso de renovación asegura que todos nuestros certificados mantienen sus habilidades actualizadas.'
    },
    {
      id: 'resources',
      question: '¿Qué recursos de aprendizaje se proporcionan durante el proceso?',
      answer: 'Los candidatos reciben acceso a: 1) Plataforma de aprendizaje con contenido exclusivo, 2) Laboratorios virtuales configurados para prácticas, 3) Mentorías personalizadas con expertos del área, 4) Biblioteca digital especializada, 5) Sesiones semanales de resolución de dudas, y 6) Comunidad privada donde pueden colaborar con otros candidatos. Todo el material está optimizado para prepararse adecuadamente para las evaluaciones.'
    }
  ];
  
  // Alternar apertura de items
  toggleItem(id: string): void {
    if (this.activeItem() === id) {
      this.activeItem.set(null);
    } else {
      this.activeItem.set(id);
    }
  }
  
  // Verificar si un item está abierto
  isItemOpen(id: string): boolean {
    return this.activeItem() === id;
  }
}