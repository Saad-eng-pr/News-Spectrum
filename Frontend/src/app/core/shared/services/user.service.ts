import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface UpdateUserDTO {
  currentPassword: string;
  newPassword?: string;
  confirmNewPassword?: string;
  username: string;
  email: string;
}

export interface DeleteUserDTO {
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/users';
  private authService = inject(AuthService);
  constructor(private http: HttpClient) {}

  getAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, {
      headers: this.authService.getToken()
        ? { Authorization: `Bearer ${this.authService.getToken()}` }
        : {}
    });
  }

  updateUser(data: UpdateUserDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, data, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }

  deleteUser(data: DeleteUserDTO): Observable<void> {
    return this.http.request<void>('delete', `${this.apiUrl}/delete`, {
      body: data,
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}
