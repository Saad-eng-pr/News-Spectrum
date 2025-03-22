import { Injectable } from '@angular/core';

import { RouterOutlet, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})


export class RelocationService {

    constructor(private router: Router) {
    }

    redirectTo(url: string) {
        //for SSR friendly logic, (probably unneccesserary)
        if (typeof window !== 'undefined') {
            //internal route
            if (url.startsWith('/') || url.startsWith('#')) {
                this.router.navigateByUrl(url);
            }
            else {
                window.location.href = url;
            }

            console.log('---------------------> Redirecting to:', url);
        }
    }
}