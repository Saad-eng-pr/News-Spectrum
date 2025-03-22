import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register',
    loadComponent: () => import('./core/pages/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'accueil', 
    loadComponent: () => import('./core/pages/acceuil/Accueil.component').then(m => m.AccueilComponent),
  },
  { 
    path: 'saved', 
    loadComponent: () => import('./core/pages/saved/saved.component').then(m => m.SavedComponent),
  },
  { 
    path: 'account', 
    loadComponent: () => import('./core/pages/account/account.component').then(m => m.AccountComponent),
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil' },
  
];