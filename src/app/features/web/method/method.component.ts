import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBrain, 
  faRoute, 
  faLightbulb, 
  faVrCardboard, 
  faChartLine, 
  faChalkboardTeacher, 
  faUsers, 
  faUserCog, 
  faRocket 
} from '@fortawesome/free-solid-svg-icons';

import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { PedagogicalApproachComponent } from './components/pedagogical-approach/pedagogical-approach.component';
import { LearningModelComponent } from './components/learning-model/learning-model.component';
import { TeachingStrategiesComponent } from './components/teaching-strategies/teaching-strategies.component';
import { EducationalTechComponent } from './components/educational-tech/educational-tech.component';
import { EvaluationFeedbackComponent } from './components/evaluation-feedback/evaluation-feedback.component';
import { RolesComponent } from './components/roles/roles.component';
import { CollaborativeLearningComponent } from './components/collaborative-learning/collaborative-learning.component';
import { AdaptabilityComponent } from './components/adaptability/adaptability.component';
import { InnovationComponent } from './components/innovation/innovation.component';
import { ParticleBackgroundComponent } from '../../../shared/components/particle-background/particle-background.component';

/**
 * Componente para la sección de Metodología, donde se explica la metodología de trabajo de la empresa.
 * Explica el método de enseñanza y aprendizaje utilizado en BlackLine Academy.
 */
@Component({
  selector: 'app-method',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    HeaderSectionComponent,
    PedagogicalApproachComponent,
    LearningModelComponent,
    TeachingStrategiesComponent,
    EducationalTechComponent,
    EvaluationFeedbackComponent,
    RolesComponent,
    CollaborativeLearningComponent,
    AdaptabilityComponent,
    InnovationComponent
  ],
  templateUrl: './method.component.html',
  styleUrl: './method.component.scss'
})
export default class MethodComponent {
  // Iconos para usar en los diferentes componentes
  protected faBrain = faBrain;
  protected faRoute = faRoute;
  protected faLightbulb = faLightbulb;
  protected faVrCardboard = faVrCardboard;
  protected faChartLine = faChartLine;
  protected faChalkboardTeacher = faChalkboardTeacher;
  protected faUsers = faUsers;
  protected faUserCog = faUserCog;
  protected faRocket = faRocket;
}