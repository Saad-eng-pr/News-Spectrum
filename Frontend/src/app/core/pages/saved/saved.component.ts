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
import { SavedArticlesService, SavedArticle } from '../../shared/savedArticles.service';



@Component({
  selector: 'app-saved',
  imports: [
    RouterOutlet, CommonModule, MatButtonModule,
    FontAwesomeModule, HeaderLayoutComponent, QuickLinksComponent,
    InstructionSectionComponent, NewsCardComponent, SidebarComponent, CardClusterComponent,SearchbarComponent
  ],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.scss'
})
export class SavedComponent {
  _articles_urls: string[] = [];
    
  constructor(public savedArticlesService: SavedArticlesService){
    this.savedArticlesService.articles$.subscribe(articles => {
      this._articles_urls = articles;
      this.constituteArticlesFromUrls();
    });
  }
  
  cards: Article[] = [];

  // THis function is only triggered by the service through the subscription
  async constituteArticlesFromUrls(){
    //Reset
    this.cards = [];

    let cardList = await this.getCards(this._articles_urls);

    for(let current_url of this._articles_urls){
      
      if(!!cardList){
        
        let foundInstance: Article | undefined = cardList.find(item => item.url === current_url);
        if(foundInstance){
          this.cards.push({...foundInstance});
        }
        // this is useful in case an article was saved by the user, and sometimes in the futute somehow it got deleted :(
        else this.cards.push(NewsCardComponent.article0)
      }
      else this.cards.push(new Article());

    }
  }


  // Mouad <------------------- 
  async getCards(urls: string[]) : Promise<Array<Article> | undefined>{


    

    let reponse : Array<Article> | undefined = undefined; // case the http request failed for example
    
    //HTTP request for the cards

    // Mouad <-------
    // response = await FUNCTION_THAT_DO_STUFF



    // the following block is just for testing functionality it should be
    // exchanged with a meaningfull response
    if(!reponse){
      //
    }
    return reponse;
  }

}
