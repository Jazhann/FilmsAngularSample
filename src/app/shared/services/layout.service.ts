import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@shared/constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  headerTitle$ = new BehaviorSubject<string>('');

  constructor(
    private router: Router
  ) { }

  setTitle(title: string) {
    this.headerTitle$.next(title);
  }

  getTitle(): Observable<string> {
    return this.headerTitle$.asObservable();
  }

  showBackButton() {
    return this.router.url.search(Constants.ROUTE_EDIT) >= 0 || this.router.url.search(Constants.ROUTE_CREATE) >= 0
  }
}
