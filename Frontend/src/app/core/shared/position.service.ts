// position.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Make sure the service is a singleton
})
export class PositionService {

  // private positionSubject = new BehaviorSubject<string>('relative');
  // position$ = this.positionSubject.asObservable();

  // setPosition(position: string) {
  //   this.positionSubject.next(position); // This updates the position value and triggers the observable
  // }
}

