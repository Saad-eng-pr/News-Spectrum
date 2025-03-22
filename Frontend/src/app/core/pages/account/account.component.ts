import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { AuthService, User } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HeaderLayoutComponent } from '../../../features/header-layout/header-layout.component';
import { SidebarComponent } from '../../../features/sidebar/sidebar.component';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HeaderLayoutComponent,SidebarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  currentUser?: User;
  isLoading = true;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.minLength(6)]],
      confirmNewPassword: ['']
    });

    // Vérification de l'authentification
    this.authService.isAuthenticated$.pipe(takeUntilDestroyed()).subscribe({
      next: (authenticated) => {
        if (!authenticated) this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.userService.getAuthenticatedUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.accountForm.patchValue({
          username: user.username,
          email: user.email
        });
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
        this.router.navigate(['/login']);
      }
    });
  }

  updateAccount(): void {
    if (this.accountForm.invalid || !this.currentUser) return;

    const formValue = this.accountForm.value;
    const updatedUser: any = {
      currentPassword: formValue.currentPassword,
      username: formValue.username,
      email: formValue.email,
    };
    
    if (formValue.newPassword) {
      updatedUser.newPassword = formValue.newPassword;
      updatedUser.confirmNewPassword = formValue.confirmNewPassword;
    }

    this.userService.updateUser(updatedUser).subscribe({
      next: () => this.handleUpdateSuccess(),
      error: (error) => this.handleError(error)
    });
  }

  private handleUpdateSuccess(): void {
    alert('Profil mis à jour avec succès');
    this.accountForm.get('currentPassword')?.reset();
    this.accountForm.get('newPassword')?.reset();
    this.accountForm.get('confirmNewPassword')?.reset();
  }

  deleteAccount(): void {
    if (!this.currentUser || !confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) return;

    this.userService.deleteUser({ password: this.accountForm.get('currentPassword')?.value }).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
        alert('Votre compte a été supprimé avec succès');
      },
      error: (error) => this.handleError(error)
    });
  }

  private handleError(error: any): void {
    const message = error.error?.message || 'Erreur lors de l\'opération';
    alert(`Erreur : ${message}`);
  }
}
