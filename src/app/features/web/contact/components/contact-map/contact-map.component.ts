import { Component, signal, computed, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente para mostrar la ubicación en un mapa estilizado
 * Utiliza un diseño estilizado cyberpunk en lugar de un mapa real
 */
@Component({
  selector: 'app-contact-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.scss']
})
export class ContactMapComponent implements AfterViewInit, OnDestroy {
  // Señal para controlar el estado de animación del mapa
  protected mapLoaded = signal<boolean>(false);
  
  // Datos de ubicación
  protected locationData = signal({
    latitude: '19.4326',
    longitude: '-99.1332',
    status: 'ACTIVE'
  });
  
  // Mensaje de estado computado
  protected mapStatus = computed(() => 
    this.mapLoaded() ? 'CONNECTED' : 'INITIALIZING'
  );
  
  // Referencia para facilitar la limpieza
  private timeoutRef: number | null = null;
  
  ngAfterViewInit(): void {
    // Simulamos un tiempo de carga para mostrar la animación
    this.timeoutRef = window.setTimeout(() => {
      this.mapLoaded.set(true);
    }, 800);
  }
  
  ngOnDestroy(): void {
    // Limpiamos el timeout para evitar fugas de memoria
    if (this.timeoutRef !== null) {
      clearTimeout(this.timeoutRef);
    }
  }
}