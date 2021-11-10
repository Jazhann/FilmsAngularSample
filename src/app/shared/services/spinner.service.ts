import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinner$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.spinner$.next(false);
  }

  hide() {
    this.spinner$.next(true);
  }

  status(): Observable<boolean> {
    return this.spinner$.asObservable();
  }
}
