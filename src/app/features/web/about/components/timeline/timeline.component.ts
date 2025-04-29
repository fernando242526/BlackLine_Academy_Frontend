import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  color?: 'cyber-cyan' | 'neon-violet' | 'glitch-green' | 'pulse-violet'; // Colores permitidos
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @Input() items: TimelineItem[] = [];
  
  // Por defecto alternamos los colores si no se especifica uno
  getItemColor(index: number, item: TimelineItem): string {
    return item.color || (index % 2 === 0 ? 'cyber-cyan' : 'neon-violet');
  }
}