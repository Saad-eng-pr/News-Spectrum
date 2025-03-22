import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { SandboxedEmojiComponent } from '../sandboxed-emoji/sandboxed-emoji.component'

import { SavedArticlesService } from '../../core/shared/savedArticles.service'
import { BiasBusterService } from '../../core/shared/biasBuster.service'
import { Observable, map } from 'rxjs';

export class Source {
  id: string;
  name: string;

  constructor(id: string = '', name: string = '') {
    this.id = id;
    this.name = name;
  }
}

export class Article {
  private static ids = 0;
  _id = -1;
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;

  biasRating!: number | undefined;

  constructor({
    source = new Source(),
    author = '',
    title = '',
    description = '',
    url = '',
    urlToImage = '',
    publishedAt = '',
    content = ''
  }: Partial<Article> = {}) {
    this._id = ++Article.ids;
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}



@Component({
  selector: 'app-news-card',
  imports: [FormsModule, FontAwesomeModule  , CommonModule, SandboxedEmojiComponent],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent implements OnChanges {
  static article0: Article = new Article({
    urlToImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVPcHGroySXhQpz_2eB-C9pmYwLtDQ4e6lQ&s',
    title : 'DummyTitle',
    description : 'dummyDescription',
    url : "I am an url",
    content : ' <ihiggfsjhsdkjhsdfkjfsd'
  });
  @Input() article!: Article;
  @Output() isVisibleEvent = new EventEmitter<string>();
  @Output() selected = new EventEmitter<boolean>();

  isSelected = false;
  isChecked = false;
  isVisible = false;

  // private isSaved = false;

  faBookmark = faBookmark//faBookmarkRegular ;

  constructor(private savedArticlesService: SavedArticlesService, private biasBusterService: BiasBusterService) {
    
    
  }

  // Hooks
  
  isItSaved(): boolean{
    return !!this.savedArticlesService.getArticleObservable(this.article.url);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['article']) {
      // If the biasRating is undefined, fetch the bias score from the service
      if (this.article.biasRating === undefined) {
        this.tieBiasModel();
      }
    }
  }

  tieBiasModel() {
    // Call the service to detect the bias score and handle response/error
    this.biasBusterService.detectBias(this.article.content).subscribe({
      next: score => this.article.biasRating = score,   // Update the biasRating with the score
      error: () => this.article.biasRating = undefined  // In case of error, set to undefined
    });
  }

  retrieveEmoji(){
    return this.article.biasRating?Math.floor(5 * (1 - this.article.biasRating / 100.0)) : 0;
  }


  onHover(entering: boolean): void {
    if (!this.isChecked) {
      this.isVisible = entering;
    }
    if(this.article.biasRating === undefined) this.tieBiasModel();
    // if(!this.article.biasRating) 
    //   this.article.biasRating = this.biasBusterService.detectBias(this.article.content);
  }

  onClickDiv(): void {
    this.isChecked = true;
    this.isVisible = true; // Keep div visible
    this.isVisibleEvent.emit(`${this.article._id}`);
    this.isSelected = !this.isSelected;
    this.selected.emit(this.isSelected);
  }
  navigateToArticle() {
    if (this.article.url) {
      window.open(this.article.url, '_blank');
    }
  }

  onCheckboxChange(event: Event): void {
    this.isChecked = (event.target as HTMLInputElement).checked;
    if (!this.isChecked) {
      this.isVisible = false; // Restore hover behavior
      this.isVisibleEvent.emit(this.article.source.id);
    }
  }

  ToggleSaving(){
    // this.isSaved = !this.isSaved;
    // if(this.isSaved)
    if(this.isItSaved()){
      this.savedArticlesService.removeArticle(this.article.url);
    }
    else
      this.savedArticlesService.addArticle(this.article.url)
  }
}
