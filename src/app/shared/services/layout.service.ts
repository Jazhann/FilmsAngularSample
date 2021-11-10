import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  headerTitle$ = new BehaviorSubject<string>('');

  constructor() { }

  setTitle(title: string) {
    this.headerTitle$.next(title);
  }

  getTitle(): Observable<string> {
    return this.headerTitle$.asObservable();
  }
}
