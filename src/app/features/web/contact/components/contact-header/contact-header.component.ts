import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticleBackgroundComponent } from '../../../../../shared/components/particle-background/particle-background.component';

/**
 * Componente para el encabezado de la página de contacto
 * Muestra un título y descripción con efectos visuales
 */
@Component({
  selector: 'app-contact-header',
  standalone: true,
  imports: [CommonModule, ParticleBackgroundComponent],
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.scss']
})
export class ContactHeaderComponent {
}