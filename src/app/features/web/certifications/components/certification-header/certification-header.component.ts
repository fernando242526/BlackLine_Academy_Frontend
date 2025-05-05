import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faAward,
  faGraduationCap,
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';

/**
 * Componente para el encabezado de la página de certificaciones
 */
@Component({
  selector: 'app-certification-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './certification-header.component.html',
  styleUrls: ['./certification-header.component.scss']
})
export class CertificationHeaderComponent {
  // Iconos
  protected faAward = faAward;
  protected faGraduationCap = faGraduationCap;
  protected faChevronDown = faChevronDown;
}