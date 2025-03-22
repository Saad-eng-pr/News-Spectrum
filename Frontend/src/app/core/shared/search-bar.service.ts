import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchBarService {
    private sidebarBoolSource = new BehaviorSubject<boolean>(false);  // Default value as false

    private stringFromQuickLinks = new BehaviorSubject<string>('');

    toggleSideBar(forced:boolean = !this.sidebarBoolSource.value) {
        this.sidebarBoolSource.next(forced);
    }

    getSidebarState() {
        return this.sidebarBoolSource.asObservable();
    }

    injectAutoSearch(str: string) {
        this.toggleSideBar(true);
        this.stringFromQuickLinks.next(str);
    }

    getStringFromQuickLinks(): Observable<string> {
        return this.stringFromQuickLinks.asObservable();
    }

}