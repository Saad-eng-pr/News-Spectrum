import { Component , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
//Fonts
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


import { RelocationService } from '../../core/shared/relocation.service';
import { StaticEnvService } from '../../core/shared/staticEnv.service';
import { SearchBarService } from '../../core/shared/search-bar.service';

@Component({
  selector: 'app-quick-links',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './quick-links.component.html',
  styleUrl: './quick-links.component.scss'
})
export class QuickLinksComponent {
  // private subscription: Subscription = new Subscription();
  search_barObs;
  toggleSidebar;
  staticEnvService:StaticEnvService;

  //icons:
  faSearch = faSearch;


  constructor(private relocationService: RelocationService,
              private searchbarService: SearchBarService
  ){
    this.staticEnvService = new StaticEnvService();
    this.search_barObs = searchbarService.getSidebarState();
    this.toggleSidebar = () => searchbarService.toggleSideBar();
  }

  // toggleSidebar{
  //   this.searchbarService.
  // }


  quickLinks: [string, () => void][] = 
                [['Actualités', () => { this.AutoSearch('Actualités') }], 
                ['Tendances', () => { this.AutoSearch('Tendances') }], 
                ['Politiques', () => { this.AutoSearch('Politiques') }], 
                ['Santé', () => { this.AutoSearch('Santé') }],
                ['Sport', () => { this.AutoSearch('Sport') }], 
                ['Economie', () => { this.AutoSearch('Economie') }]];
                
  
  redirectTo(adress: string){
    console.log('hey');
    this.relocationService.redirectTo(adress);
  }


  AutoSearch = (str: string) => { this.searchbarService.injectAutoSearch(str) };

  // //Partie d Mouad
  // TriggerSideMenu(){
  // }

}
