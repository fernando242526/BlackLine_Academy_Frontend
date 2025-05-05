import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faAward,
  faTag,
  faClock,
  faGraduationCap,
  faFire,
  faStarOfLife
} from '@fortawesome/free-solid-svg-icons';

/**
 * Componente para mostrar una tarjeta de certificación
 */
@Component({
  selector: 'app-certification-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './certification-card.component.html',
  styleUrls: ['./certification-card.component.scss']
})
export class CertificationCardComponent {
  @Input() certification: any;
  @Input() discountPercentage: number = 0;
  
  // Iconos
  protected faAward = faAward;
  protected faTag = faTag;
  protected faClock = faClock;
  protected faGraduationCap = faGraduationCap;
  protected faFire = faFire;
  protected faStarOfLife = faStarOfLife;
  
  /**
   * Devuelve las primeras N industrias para mostrar
   */
  protected getIndustries(count: number = 3): string[] {
    return this.certification?.industries?.slice(0, count) || [];
  }
  
  /**
   * Verifica si hay más industrias de las que se muestran
   */
  protected hasMoreIndustries(count: number = 3): boolean {
    return (this.certification?.industries?.length || 0) > count;
  }
  
  /**
   * Devuelve el número de industrias adicionales
   */
  protected getMoreIndustriesCount(count: number = 3): number {
    return (this.certification?.industries?.length || 0) - count;
  }
}