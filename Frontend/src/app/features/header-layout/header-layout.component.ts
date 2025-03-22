import { Component , Input , ElementRef, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { RelocationService } from '../../core/shared/relocation.service';

import { PositionService } from '../../core/shared/position.service';

import { Subscription } from 'rxjs';
import { SidebarService } from '../../core/shared/sidebar.service';

import { menuAnimations } from './dropdown.animations';  // Import the animations

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-layout',
  imports: [FontAwesomeModule,CommonModule, RouterModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  animations: [menuAnimations]
})
export class HeaderLayoutComponent {
 // Local variable from SidebarService

 dropdownStates: { [key: number]: boolean } = {}; // Track open state per dropdown
 dropdownPositions: { [key: number]: string } = {
  0: 'left bottom',
  1: 'left bottom',
  2: 'left bottom',
  3: 'left bottom',
  4: 'left bottom',
  5: 'left bottom'
};


 @ViewChildren('dropdownButton') dropdownButtons!: QueryList<ElementRef>;

 // Method to open a specific dropdown
 openMenu(index: number) {
   this.calculatePosition(index);
   this.dropdownStates[index] = true;
 }

 // Method to close a specific dropdown
 closeMenu(index: number) {
   this.dropdownStates[index] = false;
 }

 calculatePosition(index: number) {
  const button = this.dropdownButtons.toArray()[index];
  if (button) {
    const rect = button.nativeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Determine the vertical position (top or bottom)
    let verticalPosition = 'bottom'; // Default is below the button
    // if (rect.top > 200) {
    //   verticalPosition = 'top'; // Position above the button if there's not enough space below
    // }
    //requires Further Debugging

    // Determine the horizontal position (left or right)
    let horizontalPosition = 'left'; // Default is right of the button
    // if (rect.right < 200) {
    //   horizontalPosition = 'left'; // Position left if it overflows to the right
    // } 
    
    // else if (rect.left - 200 < 0) {
    //   horizontalPosition = 'right'; // Position right if it overflows to the left
    // }

    // Apply both vertical and horizontal positions
    this.dropdownPositions[index] = `${verticalPosition} ${horizontalPosition}`;
    // console.log(`${rect.left}/${viewportWidth} ${rect.right}` );
    // console.log(`w:${rect.width}  h:${rect.height}` );
  }
}


 // Handle window resize to update dropdown positions
 @HostListener('window:resize')
 onResize() {
  this.dropdownButtons.forEach((_: ElementRef, index: number) => this.calculatePosition(index));
 }




 sidebarObs;
 private subscription: Subscription = new Subscription();
 constructor(private relocationService: RelocationService, private externalStateService: SidebarService) {
  this.sidebarObs = this.externalStateService.getSidebarState();
}

 ngOnInit() {
   // Subscribe to the boolean external variable in thet service
   this.subscription = this.externalStateService.getSidebarState().subscribe(value => {
     this._isSidebarOpen = value;
   });
   
 }

 ngOnDestroy() {
   // Unsubscribe when the component is destroyed
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
 }

 private _isSidebarOpen: boolean = false;  // Local variable from SidebarService

 evento(){
    this.externalStateService.setSidebarState(!this._isSidebarOpen);
 }


  // constructor(private relocationService: RelocationService){}

  Acc_Menu = false;
  Lang_Menu = false;

  tmp = false;

  onClick(event: MouseEvent): void {
    if (event.button === 0) {
      this.tmp = !this.tmp;
    }
  }
  hoverStartTime: any = null;
  private hoverTimeout: any;
  private readonly hoverThreshold = 1000; // fews seconds
  private hoveredLongEnough = false;

  onMouseEnter() {
    this.hoveredLongEnough = false; // Reset in case of a new hover
    this.hoverStartTime = Date.now(); // Store the time when hover starts
    this.hoverTimeout = setTimeout(() => {
      this.hoveredLongEnough = true;
      console.log('Hovered long enough!');
      this.Acc_Menu = true;
    }, this.hoverThreshold);
  }

  onMouseLeave() {
    if (!this.hoveredLongEnough) {
      console.log('Hovered too briefly');
      // this.Acc_Menu = false;
    }
    else clearTimeout(this.hoverTimeout);
  }

  retrieveIcon(icon: string) {
    return (solidIcons as any)[icon];
  }

  redirectToHome(){
    console.log('hey');
    this.relocationService.redirectTo('/');
  }

  redirectTo = (str: string) => this.relocationService.redirectTo(str);

  //form:
  // [icon,texte, action function, hided] hided only works when it's truthy, undefined is a feature here :)
  accQuickActions = [
    [this.retrieveIcon('faRightToBracket'), 'Login', ()=>{ this.redirectTo('/login')}],
    [this.retrieveIcon('faUserPlus'), 'Register', ()=>{ this.redirectTo('/register')}],
    [this.retrieveIcon('faRightFromBracket'), 'Log-Out', ()=>{ console.log('Need Moad Sensai to do this')}],
  ];

}
