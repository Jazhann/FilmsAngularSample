import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, mergeMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FilmsService } from '../../services/films.service';
import { SpinnerService } from '@shared/services/spinner.service';

import * as actions from '../actions/films.actions';
import * as actorsActions from '@features/actors/store/actions/actors.actions';
import * as companiesActions from '@features/companies/store/actions/companies.actions';
import { Constants } from '@shared/constants';


 
@Injectable()
export class FilmsEffects {
  
  loadFilms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.fetchFilms),
      switchMap(() => this.filmsService.getFilms()
      .pipe(
        mergeMap(films => [
          actorsActions.fetchActors(),
          companiesActions.fetchCompanies(),
          actions.setFilms({films})
        ]),
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
    private filmsService: FilmsService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}
}