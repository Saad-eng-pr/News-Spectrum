import { Component, HostListener , OnInit, OnDestroy} from '@angular/core';
import { faHome, faUser, faCog,faHistory,faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // ✅ Import du module
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


import { Subscription } from 'rxjs';
import { SidebarService } from '../../core/shared/sidebar.service';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, RouterModule], 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy  {
  private subscription: Subscription = new Subscription();
  sidebarObs;
  constructor(private externalStateService: SidebarService) {
  this.sidebarObs = this.externalStateService.getSidebarState();}

  ngOnInit() {
    // Subscribe to the boolean external variable in thet service
    this.subscription = this.externalStateService.getSidebarState().subscribe(value => {
      this._isSidebarOpen = value;
    });
    if (typeof window !== 'undefined') {
      this.checkScreenWidth(); //SSR issue cause by mouad :)
    }
    
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public _isSidebarOpen: boolean = false;  // Local variable from SidebarService
  get isSidebarOpen(): boolean {
    return this._isSidebarOpen;
  }
  
  // Setter for isSidebarOpen
  set isSidebarOpen(value: boolean) {
    console.log('State changed:', value); // Logging added here
    this.externalStateService.setSidebarState(value);
  }


  isMobile = false;
  faHome = faHome;
  faUser = faUser;
  faCog = faCog;
  faHistory = faHistory;
  faBookmark = faBookmark;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ngOnInit() {
  //   this.checkScreenWidth();
  // }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 768;
  }

  closeSidebar() {
    this.isSidebarOpen = (false);
  }
}
