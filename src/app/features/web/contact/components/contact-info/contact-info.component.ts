import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ContactInfoItem {
  icon: IconDefinition;
  title: string;
  details: string[];
  color: string;
}

/**
 * Componente para mostrar la información de contacto
 * Muestra tarjetas con los diferentes métodos de contacto
 */
@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  @Input() contactInfo: ContactInfoItem[] = [];
}