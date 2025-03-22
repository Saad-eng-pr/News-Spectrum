import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SavedArticle {
  url: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class SavedArticlesService {
  private readonly cookieName = 'savedArticles';
  // specific watcher
  articlesSubjects: BehaviorSubject<SavedArticle>[] = [];

  // wait for any change, global watcher
  articles$: Observable<string[]> = new Observable<string[]>();

  constructor(private cookieService: CookieService) {
    this.loadArticles();
  }

  /** Load articles from the cookie into BehaviorSubjects */
  private loadArticles(): void {
    let cookieValue = this.cookieService.get(this.cookieName);

    if (!cookieValue) {
      cookieValue = '[]'; // default to an empty array
      this.cookieService.set(this.cookieName, cookieValue);
    }

    const articles: SavedArticle[] = JSON.parse(cookieValue);
    this.articlesSubjects = articles.map(article => new BehaviorSubject<SavedArticle>(article));
    this.articles$ = this.getSortedArticles$();
  }

  /** Get the array of Observable<SavedArticle> */
  getSavedArticles(): Observable<SavedArticle>[] {
    return this.articlesSubjects.map(subject => subject.asObservable());
  }

  /** Add a new article and update the cookie */
  addArticle(url: string): void {
    if (this.articlesSubjects.some(subject => subject.value.url === url)) return;

    const newArticle: SavedArticle = { url, date: new Date().toISOString() };
    const newSubject = new BehaviorSubject<SavedArticle>(newArticle);
    this.articlesSubjects.push(newSubject);
    this.updateCookie();
  }

  /** Remove an article and update the cookie */
  removeArticle(url: string): void {
    this.articlesSubjects = this.articlesSubjects.filter(subject => subject.value.url !== url);
    this.updateCookie();
  }

  /** Update the cookie based on the current subjects */
  private updateCookie(): void {
    const articles = this.articlesSubjects.map(subject => subject.value);
    this.cookieService.set(this.cookieName, JSON.stringify(articles));

    this.articles$ = this.getSortedArticles$();
  }

  /** Retrieve an observable by URL */
  getArticleObservable(url: string): Observable<SavedArticle> | undefined {
    const subject = this.articlesSubjects.find(subject => subject.value.url === url);
    return subject ? subject.asObservable() : undefined;
  }

  getSortedArticles$(): Observable<string[]> {
    console.log("test");
    return combineLatest(this.articlesSubjects).pipe(
      map(articles =>
        articles
          .slice() // Create a copy to avoid mutating the original array
          .map(article => article.url) // Extract only the URLs
      )
    );
    return combineLatest(this.articlesSubjects).pipe(
      map(articles =>
        articles
          .slice() // Create a copy to avoid mutating the original array
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort newest first
          .map(article => article.url) // Extract only the URLs
      )
    );
  }
}
