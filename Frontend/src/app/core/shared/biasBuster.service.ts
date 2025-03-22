import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BiasBusterService {
  private apiUrl = 'https://api-inference.huggingface.co/models/d4data/bias-detection-model';
  private authToken = 'your kay';  // Replace with your actual token

  constructor(private http: HttpClient) {}

  detectBias(text: string): Observable<number | undefined> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });

    const body = { inputs: text };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        // Check for HTML response (API error case)
        if (response instanceof Array && response[0] && response[0][0]?.label) {
          // Extract the "Biased" score
          const biasedScore = response[0].find((item: any) => item.label === 'Biased')?.score;
          if (biasedScore === undefined) {
            throw new Error('Biased score not found in response');
          }
          // Return the score as a percentage (0-100 range)
          return +(biasedScore * 100).toFixed(1);
        } else {
          throw new Error('Unexpected API response');
        }
      }),
      catchError(() => of(undefined)) // Return undefined in case of error or unexpected response
    );
  }
}
