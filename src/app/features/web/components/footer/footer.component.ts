import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faTwitter, 
  faFacebookF, 
  faInstagram, 
  faYoutube, 
  faLinkedinIn, 
  faTwitch 
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Iconos de redes sociales
  protected faTwitter = faTwitter;
  protected faFacebook = faFacebookF;
  protected faInstagram = faInstagram;
  protected faYoutube = faYoutube;
  protected faLinkedin = faLinkedinIn;
  protected faTwitch = faTwitch;
  
  // Año actual para copyright
  currentYear = new Date().getFullYear();
  
  // Enlaces del footer
  footerLinks = [
    {
      title: 'Plataforma',
      links: [
        { label: 'Inicio', path: '/' },
        { label: 'Sobre BlackLine', path: '/nosotros' },
        { label: 'Formaciones', path: '/cursos' },
        { label: 'Método BlackLine', path: '/modalidades' },
        { label: 'Certificaciones', path: '/certificaciones' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Biblioteca', path: '/recursos' },
        { label: 'Blog Tecnológico', path: '/blog' },
        { label: 'Documentación', path: '/docs' },
        { label: 'FAQ', path: '/faq' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos de Servicio', path: '/terminos' },
        { label: 'Política de Privacidad', path: '/privacidad' },
        { label: 'Política de Cookies', path: '/cookies' }
      ]
    },
    {
      title: 'Contacto',
      links: [
        { label: 'Contáctanos', path: '/contacto' },
        { label: 'Soporte', path: '/soporte' },
        { label: 'Trabaja con nosotros', path: '/empleos' }
      ]
    }
  ];
}