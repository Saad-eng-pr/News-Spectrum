import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../../features/news-card/news-card.component';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://localhost:8080/news';

  constructor(private http: HttpClient) { }

  searchNews(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: { query }
    });
  }

  multipleSourcesSearch(query: string, sources: string[]): Observable<any> {
    return this.http.get(`${this.baseUrl}/multipleSources`, {
      params: { 
        query,
        sources // HttpClient gère automatiquement les tableaux
      }
    });
  }

  analyzeArticles(articles: Article[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/analyze`, { articles });
  }
}