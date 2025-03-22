import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Subscription } from 'rxjs';
// from shared:
import { SearchBarService } from '../../core/shared/search-bar.service';

@Component({
  selector: 'app-instruction-section',
  imports: [CommonModule],
  templateUrl: './instruction-section.component.html',
  styleUrl: './instruction-section.component.scss'
})
export class InstructionSectionComponent {
  search_barObs;
  constructor(private searchbarService: SearchBarService) {
      this.search_barObs = searchbarService.getSidebarState();
    }
}
