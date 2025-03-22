import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

import { NewsCardComponent, Article } from '../news-card/news-card.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-cluster',
  imports: [NewsCardComponent, CommonModule,],
  templateUrl: './card-cluster.component.html',
  styleUrl: './card-cluster.component.scss'
})


export class CardClusterComponent {
  // article0: Article = NewsCardComponent.article0;
  @Input() articles: Array<Article> = [];
  @Output() selectedCardsEvent = new EventEmitter<Array<string>>();

  private selectedCards: Array<string> = []; // has to be volatile !!! to avoid unwanted caching.

  blurry: boolean = false;

  shouldBlur(): boolean{
    return !!this.selectedCards.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articles']) {
      // const prevValue = changes['articles'].previousValue;
      // const currentValue = changes['articles'].currentValue;

      // console.log(`inputValue changed from ${prevValue} to ${currentValue}`);

      // // Trigger any action when the input changes
      this.resetSelectedCards();
      this.selectedCardsEvent.emit(this.selectedCards);
    }
    if(changes['selectedCards']){
      this.blurry = this.shouldBlur();
      console.log('fsfddf',this.blurry);
    }
  }

  reloadSelectedCards(str: string) {
    console.log('testi', str);
    if (str) {
      let index = this.selectedCards.indexOf(str);
      if (index !== -1) {
        this.selectedCards.splice(index, 1);
      }
      else this.selectedCards.push(str);
      
      this.selectedCardsEvent.emit(this.selectedCards);
      this.blurry = this.shouldBlur();
    }
  }

  resetSelectedCards() {
    this.selectedCards = [];
    for (let article of this.articles) {
      if (article.source.id)
        this.selectedCards.push(article.source.id);
    }
  }



  // constructor() {
  //   for (let i = 0; i < 5; i++) {
  //     console.log(`successful ${i}`);
  //     this.articles.push({ ...this.article0 }); // Spread operator to clone
  //   }
  // }
}
