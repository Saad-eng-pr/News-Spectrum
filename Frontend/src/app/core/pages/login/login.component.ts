import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/services/auth.service';

import { HeaderLayoutComponent } from '../../../features/header-layout/header-layout.component';
import { SidebarComponent } from '../../../features/sidebar/sidebar.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FontAwesomeModule,HeaderLayoutComponent,SidebarComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  loading = false;
  errorMessage='';

  // Icônes FontAwesome
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
  
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/accueil']); // Redirection après succès
        },
        error: (err) => {
          this.handleLoginError(err);
        }
      });
  }
  private handleLoginError(err: any) {
    this.loading = false;
    this.errorMessage = this.getErrorMessage(err);
  }

  private getErrorMessage(err: any): string {
    if (err.status === 0) return 'Connexion au serveur impossible';
    if (err.status === 401) return 'Email ou mot de passe incorrect';
    return err.error?.message || 'Erreur lors de la connexion';
  }
}

