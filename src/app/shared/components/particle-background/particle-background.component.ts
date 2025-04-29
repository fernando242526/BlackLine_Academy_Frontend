import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: `<canvas #canvas class="absolute inset-0 w-full h-full"></canvas>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ParticleBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  
  // Colores para las partículas
  private colors = [
    'rgba(143, 0, 255, 0.7)',  // neon-violet
    'rgba(0, 240, 255, 0.7)',  // cyber-cyan
    'rgba(255, 0, 77, 0.7)',   // critical-red
    'rgba(92, 42, 157, 0.7)',  // glitch-purple
    'rgba(0, 255, 156, 0.7)'   // glitch-green
  ];
  
  ngAfterViewInit(): void {
    this.initCanvas();
    this.createParticles();
    this.animate();
    
    // Ajustar tamaño del canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', this.handleResize);
  }
  
  ngOnDestroy(): void {
    // Detener la animación y limpiar event listener
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    
    window.removeEventListener('resize', this.handleResize);
  }
  
  // Handler para redimensionar el canvas
  private handleResize = (): void => {
    const parent = this.canvas.parentElement;
    
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    }
  }
  
  // Inicializar el canvas
  private initCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    const context = this.canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Canvas context not supported');
    }
    
    this.ctx = context;
    
    // Ajustar tamaño del canvas
    const parent = this.canvas.parentElement;
    
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    }
  }
  
  // Crear partículas iniciales
  private createParticles(): void {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(
        this.canvas.width,
        this.canvas.height,
        this.colors[Math.floor(Math.random() * this.colors.length)]
      ));
    }
  }
  
  // Animar las partículas
  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Actualizar y dibujar cada partícula
    for (const particle of this.particles) {
      particle.update();
      particle.draw(this.ctx);
    }
    
    // Dibujar conexiones entre partículas cercanas
    this.drawConnections();
    
    // Llamar al siguiente frame
    this.animationId = requestAnimationFrame(this.animate);
  }
  
  // Dibujar líneas entre partículas cercanas
  private drawConnections(): void {
    const maxDistance = 150;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calcula la opacidad basada en la distancia (más cercanas = más opacas)
          const opacity = 1 - (distance / maxDistance);
          
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(41, 45, 53, ${opacity * 0.8})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

// Clase para representar cada partícula
class Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  maxWidth: number;
  maxHeight: number;
  
  constructor(maxWidth: number, maxHeight: number, color: string) {
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.x = Math.random() * maxWidth;
    this.y = Math.random() * maxHeight;
    this.size = Math.random() * 1.5 + 0.5;
    this.color = color;
    
    // Velocidades aleatorias entre -0.5 y 0.5
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  
  // Actualizar posición
  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Si la partícula sale del canvas, la devolvemos al borde opuesto
    if (this.x < 0 || this.x > this.maxWidth) {
      this.speedX = -this.speedX;
    }
    
    if (this.y < 0 || this.y > this.maxHeight) {
      this.speedY = -this.speedY;
    }
  }
  
  // Dibujar la partícula
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}