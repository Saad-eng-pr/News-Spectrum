import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

import { HeaderLayoutComponent } from '../../../features/header-layout/header-layout.component';
import { SidebarComponent } from '../../../features/sidebar/sidebar.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderLayoutComponent, SidebarComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.name, this.email, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            state: { registrationSuccess: true }
          });
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message;
        }
      });
  }

  isValid(input: any): boolean {
    return input.valid && (input.dirty || input.touched);
  }

  hasError(input: any): boolean {
    return input.invalid && (input.dirty || input.touched);
  }
}