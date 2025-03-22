import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, tap, Observable, BehaviorSubject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

// Interfaces
export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
}
interface RegisterResponse {
  userId: number;
  username: string;
  email: string;
}
interface LoginResponse {
  token: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage: Storage | null = null;
  readonly apiUrl = 'http://localhost:8080/auth';
  private authState = new BehaviorSubject<boolean>(false);
  isAuthenticated = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = localStorage;
    }
    this.checkAuthStatus();
  }

  register(username: string, email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/signup`, {
      username,
      email,
      password,
    }).pipe(
      catchError(this.handleAuthError('Erreur lors de l\'inscription'))
    );
  }

  // Dans auth.service.ts
login(email: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
    tap(response => {
      if (this.storage) {
        this.storage.setItem('authToken', response.token);
        // Rafraîchir l'état immédiatement
        this.authState.next(true);
        this.isAuthenticated.set(true);
      }
    })
  );
}

getToken(): string | null {
  return isPlatformBrowser(this.platformId) 
    ? localStorage.getItem('authToken')
    : null;
}

// Modifiez checkAuthStatus
private checkAuthStatus(): void {
  if (isPlatformBrowser(this.platformId)) {
    const token = this.getToken();
    this.authState.next(!!token);
    this.isAuthenticated.set(!!token);
  }
}

  logout(): void {
    if (this.storage) {
      this.storage.removeItem('authToken');
    }
    this.authState.next(false);
    this.isAuthenticated.set(false);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private handleAuthError(defaultMessage: string) {
    return (error: any) => {
      let message = defaultMessage;

      if (error.status === 0) {
        message = 'Serveur inaccessible';
      } else if (error.error?.message) {
        message = error.error.message;
      } else if (error.status === 401) {
        message = 'Identifiants invalides';
      } else if (error.status === 409) {
        message = 'Cet email est déjà utilisé';
      }

      return throwError(() => new Error(message));
    };
  }
}
