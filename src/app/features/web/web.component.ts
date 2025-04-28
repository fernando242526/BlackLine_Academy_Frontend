import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-web',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export default class WebComponent {

}
