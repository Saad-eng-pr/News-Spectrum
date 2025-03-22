import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    private sidebarBoolSource = new BehaviorSubject<boolean>(false);  // Default value as false

    setSidebarState(value: boolean) {
        console.log('State changed:', value); // Logging added here
        this.sidebarBoolSource.next(value);  
    }

    getSidebarState() {
        return this.sidebarBoolSource.asObservable();
    }
}