import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';

import { LayoutService } from '@shared/services/layout.service';
import { SpinnerService } from '@shared/services/spinner.service';

import { Constants } from '@shared/constants';
import { AppState } from '@core/app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '@features/films/store/actions/films.actions';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  CONST = Constants;
  spinnerStatus = false;
  subscription!: Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private layoutService: LayoutService,
    private spinnerService: SpinnerService,
    private store: Store<AppState>,
  ) { 
    this.layoutService.setTitle('Home');
    this.subscription = this.spinnerService.status().subscribe( status => this.spinnerStatus = status);
    this.spinnerService.show();
    this.store.dispatch(actions.fetchFilms());
  } 

  menuToggle() {
    this.sidenav.toggle();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }

}
