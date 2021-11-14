import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CompaniesService } from '../../services/companies.service';
import { SpinnerService } from '@shared/services/spinner.service';
import * as actions from '../actions/companies.actions';
import { Constants } from '@shared/constants';


 
@Injectable()
export class CompaniesEffects {
  
  loadCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.fetchCompanies),
      switchMap(() => this.companiesService.getCompanies()
      .pipe(
        map(companies => {
          this.spinnerService.hide();
          return actions.setCompanies({companies}) 
        }),
        catchError(() => {
          this.spinnerService.hide();
          return of( actions.errorLoadingData())
        })
      ))
    ) 
  });

  goToErrorPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.errorLoadingData),
      tap(() => this.router.navigate([Constants.ROUTE_ERROR]))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private companiesService: CompaniesService,
    private router: Router,
    private spinnerService: SpinnerService
  ) { }
  
}