import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderLayoutComponent } from '../../../features/header-layout/header-layout.component';
import { QuickLinksComponent } from '../../../features/quick-links/quick-links.component';
import { InstructionSectionComponent } from '../../../features/instruction-section/instruction-section.component';
import { NewsCardComponent, Article } from '../../../features/news-card/news-card.component';
import { CardClusterComponent } from '../../../features/card-cluster/card-cluster.component';
import { SidebarComponent } from '../../../features/sidebar/sidebar.component';
import { SearchbarComponent } from '../../../features/search-bar/search-bar.component';

import { RelocationService } from '../../shared/relocation.service';
import { StaticEnvService } from '../../shared/staticEnv.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-Accueil',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, MatButtonModule,
    FontAwesomeModule, HeaderLayoutComponent, QuickLinksComponent,
    InstructionSectionComponent, NewsCardComponent, SidebarComponent, CardClusterComponent,SearchbarComponent
  ],
  templateUrl: './Accueil.component.html',
  styleUrl: './Accueil.component.scss'
})
export class AccueilComponent  {
  // test import :
  articles_def = (() => {
    let __arcticles: Array<Article> = [];
    for (let i = 0; i < 5; i++) {
          console.log(`successful ${i}`);
          __arcticles.push({ ...NewsCardComponent.article0 }); // Spread operator to clone
        }
    return __arcticles;
  })();

  title = 'NewsSpectrum';
  article0: Article = new Article();

  constructor(private relocationService: RelocationService) {
    this.article0.urlToImage = 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';
    this.article0.title = 'DummyTitle';
    this.article0.description = 'dummyDescription';
  }
 
  handleSearch(event: { term: string; sort: string; sources: string[] }) {
    // Implémentez la logique de recherche ici
    console.log('Search event:', event);
  }

}