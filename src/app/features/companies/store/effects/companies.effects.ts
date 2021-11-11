import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CompaniesService } from '../../services/companies.service';
import * as actions from '../actions/companies.actions';
import { SpinnerService } from '@shared/services/spinner.service';


 
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
        catchError(() => EMPTY)
      ))
    ) 
  })

  constructor(
    private actions$: Actions,
    private companiesService: CompaniesService,
    private spinnerService: SpinnerService
  ) {
    
  }
  
 
}