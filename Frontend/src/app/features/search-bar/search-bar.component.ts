import { Component, EventEmitter, Input,  Output, OnInit, OnDestroy  } from '@angular/core';
import { faExclamationTriangle, faRedo, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { debounceTime, Subject } from 'rxjs';
import { NewsService } from '../../core/shared/services/news.service';
import { Article } from '../news-card/news-card.component';
import { Observable, Subscription } from 'rxjs';

// from shared:
import { SearchBarService } from '../../core/shared/search-bar.service';
import { CardClusterComponent } from "../card-cluster/card-cluster.component";
type  PoliticalContext = 'western' | 'arab' | 'global';

let context: PoliticalContext = 'western'; // OK
context = 'global';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, CardClusterComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  // private subscription: Subscription = new Subscription();
  
  search_barObs;
  visibleSources: string[] = [];
  hiddenSources: string[] = [];
  showSourceModal = false;
  sourceSearch = '';
  filteredModalSources: string[] = [];
  private maxVisibleSources = 8; 
  @Input() searchQuery = '';
  results: Article[] = [];
  errorMessage = '';
  visibleLanguages: string[] = [];
  hiddenLanguages: string[] = [];
  visibleCountries: string[] = [];
  hiddenCountries: string[] = [];
  showLanguageModal = false;
  showCountryModal = false;
  languageSearch = '';
  countrySearch = '';
  filteredModalLanguages: any[] = [];
  filteredModalCountries: any[] = [];
  private maxVisibleItems = 5;
  showErrorModal = false;
  errorDetails: any;
  showDetails = false;
  faExclamationTriangle = faExclamationTriangle;
  faRedo = faRedo;

  isSearchBarVisible = false; // Par défaut, la search bar est cachée
  isFiltersVisible = false;
  filterByDate = false;
  filterByAuthor = false;
  filterByCategory = false;
  faSearch = faSearch;
  faFilter= faFilter;
  searchTerm = '';
  selectedSort = 'date';
  sources = ["Tous","ABC-News", "ABC-News-(AU)", "Aftenposten", "Al-Jazeera-English", "ANSA.it", "Argaam", "Ars-Technica", "Ary-News", "Associated-Press", "Australian-Financial-Review", "Axios", "BBC-News", "BBC-Sport", "Bild", "Blasting-News-(BR)", "Bleacher-Report", "Bloomberg", "Breitbart-News", "Business Insider", "Buzzfeed", "CBC-News", "CBS-News", "CNN", "CNN-Spanish", "Crypto-Coins-News", "Der-Tagesspiegel", "Die-Zeit", "El-Mundo", "Engadget", "Entertainment-Weekly", "ESPN", "ESPN-Cric-Info", "Financial-Post", "Focus", "Football Italia", "Fortune", "FourFourTwo", "Fox-News", "Fox-Sports", "Globo", "Google-News", "Google-News-(Argentina)", "Google-News-(Australia)", "Google-News-(Brasil)", "Google-News-(Canada)", "Google-News-(France)", "Google-News-(India)", "Google-News-(Israel)", "Google-News-(Italy)", "Google-News-(Russia)", "Google-News-(Saudi Arabia)", "Google-News-(UK)", "Göteborgs-Posten", "Gruenderszene", "Hacker-News", "Handelsblatt", "IGN", "Il-Sole-24-Ore", "Independent", "Infobae", "InfoMoney", "La-Gaceta", "La-Nacion", "La-Repubblica", "Le-Monde", "Lenta", "L'equipe", "Les-Echos", "Liberation", "Marca", "Mashable", "Medical-News-Today", "MSNBC", "MTV-News", "MTV-News-(UK)", "National-Geographic", "National-Review", "NBC-News", "News24", "New-Scientist", "News.com.au", "Newsweek", "New-York-Magazine", "Next-Big-Future", "NFL-News", "NHL-News", "NRK", "Politico", "Polygon", "RBC", "Recode", "Reddit-/r/all", "Reuters", "RT", "RTE", "RTL-Nieuws", "SABQ", "Spiegel-Online", "Svenska-Dagbladet", "T3n", "TalkSport", "TechCrunch", "TechCrunch-(CN)", "TechRadar", "The American-Conservative", "The-Globe-And-Mail", "The-Hill", "The-Hindu", "The-Huffington-Post", "The-Irish-Times", "The-Jerusalem-Post", "The-Lad-Bible", "The-Next-Web", "The-Sport-Bible", "The-Times-of-India", "The-Verge", "The-Wall-Street-Journal", "The Washington Post", "The-Washington-Times", "Time", "USA-Today", "Vice-News", "Wired", "Wired.de", "Wirtschafts-Woche", "Xinhua-Net", "Ynet"];
  selectedSources: string[] = ['Tous'];
  languages = [
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'Arabe'},
    { code: 'en', name: 'Anglais' },
    { code: 'es', name: 'Espagnol' },
    { code: 'de', name: 'Allemand' },
  ];

  countries = [
    { code: 'ma', name: 'Maroc'},
    { code: 'fr', name: 'France' },
    { code: 'us', name: 'États-Unis' },
    { code: 'gb', name: 'Royaume-Uni' },
    { code: 'de', name: 'Allemagne' },
  ];
  searchFilters = {
    query: '',
    category: '',
    language: '',
    source: ''
  };
  showAnalysis = false;
  analysisResult: any;

  selectedLanguages: string[] = [];
  selectedCountries: string[] = [];
  selectedArticles: Article[] = [];
  private searchSubject = new Subject<string>();

  @Output() search = new EventEmitter<{
    term: string;
    sort: string;
    sources: string[];
  }>(); 
  cmp=0;


  private stringSubs!: Subscription;

  constructor(private searchbarService: SearchBarService,private newsService: NewsService) {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.emitSearch();
      
    });

    // search bar service
    this.search_barObs = searchbarService.getSidebarState();
    this.organizeSources();
    

  }


 //hooks

  ngOnInit(): void {
    // Subscribe to the observable
    this.stringSubs = this.searchbarService.getStringFromQuickLinks().subscribe(
      (data) => {
        console.log(data);  // Handle the data
        this.searchQuery = data;
        this.onSearch();
      },
      (error) => {
        console.error(error);  // Handle the error
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.stringSubs) {
      this.stringSubs.unsubscribe();
    }
  }





  // async handleBiasBuster() {
  //   if (this.cmp < 2) {
  //     this.showNotification(`Sélectionnez au moins 2 articles (actuellement: ${this.cmp})`);
  //     return;
  //   }
  
  //   try {
  //     const result = await this.newsService.analyzeArticles(this.selectedArticles).toPromise();
  //     this.analysisResult = result;
  //     this.showAnalysis = true;
  //   } catch (error) {
  //     this.showErrorModale('Échec de l\'analyse. Vérifiez votre connexion.');
  //   }
  // }
  
  // getBiasColor(score: number, context: PoliticalContext) {
  //   const colors = this.politicalColors[context];
    
  //   if (score < -0.3) return colors.left;
  //   if (score > 0.3) return colors.right;
  //   return colors.neutral;
  // }
  // private showErrorModale(message: string, details?: any) {
  //   this.errorMessage = message;
  //   this.errorDetails = details;
  //   this.showErrorModal = true;
  // }
  politicalColors: { 
    [key in PoliticalContext]: { left: string; neutral: string; right: string } 
  } = {
    western: { left: '#3182CE', neutral: '#48BB78', right: '#E53E3E' },
    arab: { left: '#2B6CB0', neutral: '#38A169', right: '#C53030' },
    global: { left: '#4A5568', neutral: '#718096', right: '#1A202C' }
  };
  // private showNotification(message: string, type: 'info' | 'warning' | 'error' = 'info') {
  //   const notification = document.createElement('div');
  //   notification.className = `notification ${type}`;
  //   notification.innerHTML = `
  //     <span>${message}</span>
  //     <button onclick="this.parentElement.remove()">&times;</button>
  //   `;
    
  //   document.body.appendChild(notification);
  //   setTimeout(() => notification.remove(), 5000);
  // }
  onSearch() {
    const handleResponse = {
      next: (response: any) => {
        this.results = response.articles || [];
        this.errorMessage = '';
        this.applySorting(); // Ajouter le tri si nécessaire
      },
      error: (err: any) => {
        this.errorMessage = 'Impossible de charger les résultats. Vérifiez votre connexion ou essayez une autre recherche.';
        this.errorDetails = err.error || err.message;
        this.showErrorModal = true;
        this.results = [];
        console.error('Search error:', err);
      }
    };
    if (this.searchQuery.trim()) {
      // Gestion spéciale pour "Tous"
      const effectiveSources = this.selectedSources.includes('Tous') 
        ? [] 
        : this.selectedSources;
  
      if (effectiveSources.length > 0) {
        // Recherche avec sources sélectionnées
        this.newsService.multipleSourcesSearch(this.searchQuery.trim(), effectiveSources)
          .subscribe(handleResponse);
      } else {
        // Recherche générale sans filtre de source
        this.newsService.searchNews(this.searchQuery.trim())
          .subscribe(handleResponse);
      }
    }
  }
  
  private applySorting() {
    switch(this.selectedSort) {
      case 'date':
        this.results.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'source':
        this.results.sort((a, b) => 
          a.source.name.localeCompare(b.source.name));
        break;
    }
  }

  
  private organizeSources() {
    // Séparer 'Tous' du reste
    const tousIndex = this.sources.indexOf('Tous');
    const allSources = [...this.sources];
    const tous = allSources.splice(tousIndex, 1);
  
    // Réorganiser les sources visibles avec 'Tous' en premier
    this.visibleSources = [
      ...tous,
      ...allSources.slice(0, this.maxVisibleSources - 1)
    ];
    
    this.hiddenSources = allSources.slice(this.maxVisibleSources - 1);
    this.filteredModalSources = this.sources; // Conserver 'Tous' dans la modal
    const allLangs = this.languages.map(l => l.name);
    this.visibleLanguages = allLangs.slice(0, this.maxVisibleItems);
    this.hiddenLanguages = allLangs.slice(this.maxVisibleItems);

    // Organisation des pays
    const allCountries = this.countries.map(c => c.name);
    this.visibleCountries = allCountries.slice(0, this.maxVisibleItems);
    this.hiddenCountries = allCountries.slice(this.maxVisibleItems);
  }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onSortChange() {
    this.emitSearch();
  }

  toggleSource(source: string) {
    if (source === 'Tous') {
      this.selectedSources = ['Tous'];
    } else {
      const index = this.selectedSources.indexOf(source);
      if (index > -1) {
        this.selectedSources.splice(index, 1);
      } else {
        this.selectedSources.push(source);
      }
      // Remove 'Tous' if other sources are selected
      if (this.selectedSources.includes('Tous') && this.selectedSources.length > 1) {
        this.selectedSources = this.selectedSources.filter(s => s !== 'Tous');
      }
    }
    this.organizeSources();
    this.emitSearch();
  }
  openSourceModal() {
    this.showSourceModal = true;
    this.sourceSearch = '';
    this.filterSources();
  }

  closeSourceModal() {
    this.showSourceModal = false;
  }

  filterSources() {
    const searchTerm = this.sourceSearch.toLowerCase();
    this.filteredModalSources = this.sources.filter(source => 
      source.toLowerCase().includes(searchTerm) // Retirer le filtre 'Tous'
    );
  }

  private emitSearch() {
    this.search.emit({
      term: this.searchTerm,
      sort: this.selectedSort,
      sources: this.selectedSources,
    });
  }
  openLanguageModal() {
    this.showLanguageModal = true;
    this.languageSearch = '';
    this.filterLanguages();
  }

  filterLanguages() {
    const searchTerm = this.languageSearch.toLowerCase();
    this.filteredModalLanguages = this.languages.filter(lang => 
      lang.name.toLowerCase().includes(searchTerm))
  }
  openCountryModal() {
    this.showCountryModal = true;
    this.countrySearch = '';
    this.filterCountries();
  }

  filterCountries() {
    const searchTerm = this.countrySearch.toLowerCase();
    this.filteredModalCountries = this.countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm))
  }
  getLangCode(langName: string): string {
    const lang = this.languages.find(l => l.name === langName);
    return lang ? lang.code : 'unknown';
  }
  
  getCountryCode(countryName: string): string {
    const country = this.countries.find(c => c.name === countryName);
    return country ? country.code : 'unknown';
  }
  toggleLanguage(langName: string) {
    if (langName === 'Tous') {
      // Si "Tous" est sélectionné, on désélectionne tout le reste
      this.selectedLanguages = ['Tous'];
    } else {
      const index = this.selectedLanguages.indexOf(langName);
      if (index > -1) {
        // Si la langue est déjà sélectionnée, on la retire
        this.selectedLanguages.splice(index, 1);
      } else {
        // Sinon, on l'ajoute
        this.selectedLanguages.push(langName);
      }
  
      // Si "Tous" était sélectionné et qu'on ajoute une autre langue, on retire "Tous"
      if (this.selectedLanguages.includes('Tous') && this.selectedLanguages.length > 1) {
        this.selectedLanguages = this.selectedLanguages.filter(lang => lang !== 'Tous');
      }
    }
  
    // Réorganiser les langues visibles
    this.organizeSources();
  
    // Émettre la recherche avec les nouveaux filtres
    this.emitSearch();
  }
  toggleCountry(countryName: string) {
    if (countryName === 'Tous') {
      // Si "Tous" est sélectionné, on désélectionne tout le reste
      this.selectedCountries = ['Tous'];
    } else {
      const index = this.selectedCountries.indexOf(countryName);
      if (index > -1) {
        // Si le pays est déjà sélectionné, on le retire
        this.selectedCountries.splice(index, 1);
      } else {
        // Sinon, on l'ajoute
        this.selectedCountries.push(countryName);
      }
  
      // Si "Tous" était sélectionné et qu'on ajoute un autre pays, on retire "Tous"
      if (this.selectedCountries.includes('Tous') && this.selectedCountries.length > 1) {
        this.selectedCountries = this.selectedCountries.filter(country => country !== 'Tous');
      }
    }
  
    // Réorganiser les pays visibles
    this.organizeSources();
  
    // Émettre la recherche avec les nouveaux filtres
    this.emitSearch();
  }
  openFilters() {
    // Logique pour ouvrir un modal ou afficher des filtres supplémentaires
    this.isFiltersVisible = !this.isFiltersVisible; // Inverse l'état actuel
    console.log('Filtres visibles :', this.isFiltersVisible);
  
  }
  getUniqueContexts(): PoliticalContext[] {
    if (!this.analysisResult?.politicalContexts) return [];
    return [...new Set(Object.values(this.analysisResult.politicalContexts))] as PoliticalContext[];
  }
  getCountryCodeFromSource(sourceName: string): string {
    // Essayez de trouver un code pays dans les mappings
    const countryMapping: { [key: string]: string } = {
      'Tous': 'all',
      'ABC-News': 'us',
      'ABC-News-(AU)': 'au',
      'Aftenposten': 'no',
      'Al-Jazeera-English': 'qa',
      'ANSA.it': 'it',
      'Argaam': 'sa',
      'Ars-Technica': 'us',
      'Ary-News': 'pk',
      'Associated-Press': 'us',
      'Australian-Financial-Review': 'au',
      'Axios': 'us',
      'BBC-News': 'gb',
      'BBC-Sport': 'gb',
      'Bild': 'de',
      'Blasting-News-(BR)': 'br',
      'Bleacher-Report': 'us',
      'Bloomberg': 'us',
      'Breitbart-News': 'us',
      'Business-Insider': 'us',
      'Buzzfeed': 'us',
      'CBC-News': 'ca',
      'CBS-News': 'us',
      'CNN': 'us',
      'CNN-Spanish': 'us',
      'Crypto-Coins-News': 'us',
      'Der-Tagesspiegel': 'de',
      'Die-Zeit': 'de',
      'El-Mundo': 'es',
      'Engadget': 'us',
      'Entertainment-Weekly': 'us',
      'ESPN': 'us',
      'ESPN-Cric-Info': 'in',
      'Financial-Post': 'ca',
      'Focus': 'de',
      'Football Italia': 'it',
      'Fortune': 'us',
      'FourFourTwo': 'gb',
      'Fox News': 'us',
      'Fox-Sports': 'us',
      'Globo': 'br',
      'Google-News': 'all',
      'Google-News-(Argentina)': 'ar',
      'Google-News-(Australia)': 'au',
      'Google-News-(Brasil)': 'br',
      'Google-News-(Canada)': 'ca',
      'Google-News-(France)': 'fr',
      'Google-News-(India)': 'in',
      'Google-News-(Israel)': 'il',
      'Google-News-(Italy)': 'it',
      'Google-News-(Russia)': 'ru',
      'Google-News-(Saudi Arabia)': 'sa',
      'Google-News-(UK)': 'gb',
      'Göteborgs-Posten': 'se',
      'Gruenderszene': 'de',
      'Hacker-News': 'us',
      'Handelsblatt': 'de',
      'IGN': 'us',
      'Il-Sole-24-Ore': 'it',
      'Independent': 'gb',
      'Infobae': 'ar',
      'InfoMoney': 'br',
      'La-Gaceta': 'es',
      'La-Nacion': 'ar',
      'La-Repubblica': 'it',
      'Le-Monde': 'fr',
      'Lenta': 'ru',
      "L'equipe": 'fr',
      'Les-Echos': 'fr',
      'Liberation': 'fr',
      'Marca': 'es',
      'Mashable': 'us',
      'Medical-News-Today': 'us',
      'MSNBC': 'us',
      'MTV-News': 'us',
      'MTV-News-(UK)': 'gb',
      'National-Geographic': 'us',
      'National-Review': 'us',
      'NBC-News': 'us',
      'News24': 'za',
      'New-Scientist': 'gb',
      'News.com.au': 'au',
      'Newsweek': 'us',
      'New-York-Magazine': 'us',
      'Next-Big-Future': 'us',
      'NFL-News': 'us',
      'NHL-News': 'us',
      'NRK': 'no',
      'Politico': 'us',
      'Polygon': 'us',
      'RBC': 'ca',
      'Recode': 'us',
      'Reddit-/r/all': 'all',
      'Reuters': 'gb',
      'RT': 'ru',
      'RTE': 'ie',
      'RTL-Nieuws': 'nl',
      'SABQ': 'sa',
      'Spiegel-Online': 'de',
      'Svenska-Dagbladet': 'se',
      'T3n': 'de',
      'TalkSport': 'gb',
      'TechCrunch': 'us',
      'TechCrunch-(CN)': 'cn',
      'TechRadar': 'gb',
      'The-American-Conservative': 'us',
      'The-Globe-And-Mail': 'ca',
      'The-Hill': 'us',
      'The-Hindu': 'in',
      'The-Huffington-Post': 'us',
      'The-Irish-Times': 'ie',
      'The-Jerusalem-Post': 'il',
      'The-Lad-Bible': 'gb',
      'The-Next-Web': 'us',
      'The-Sport-Bible': 'gb',
      'The-Times-of-India': 'in',
      'The-Verge': 'us',
      'The-Wall-Street-Journal': 'us',
      'The Washington Post': 'us',
      'The-Washington-Times': 'us',
      'Time': 'us',
      'USA-Today': 'us',
      'Vice-News': 'us',
      'Wired': 'us',
      'Wired.de': 'de',
      'Wirtschafts-Woche': 'de',
      'Xinhua-Net': 'cn',
      'Ynet': 'il'
      // Ajoutez d'autres mappings
    };
  
    // Vérifiez d'abord le mapping explicite
    if (countryMapping[sourceName]) return countryMapping[sourceName];
  
    // Fallback: Essayez d'extraire le code du nom de la source
    const countryMatch = sourceName.match(/\(([A-Z]{2})\)/); // Exemple: "Source (FR)"
    return countryMatch ? countryMatch[1].toLowerCase() : 'us';
  }

}