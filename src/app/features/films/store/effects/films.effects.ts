import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FilmsService } from '../../services/films.service';
import * as actions from '../actions/films.actions';
import * as actorsActions from '@features/actors/store/actions/actors.actions';
import * as companiesActions from '@features/companies/store/actions/companies.actions';
import { SpinnerService } from '@shared/services/spinner.service';
import { AppState } from '@core/app.reducer';
import { Store } from '@ngrx/store';



 
@Injectable()
export class FilmsEffects {
  
  loadFilms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.fetchFilms),
      switchMap(() => this.filmsService.getFilms()
      .pipe(
        map(films => {
          this.store.dispatch(actorsActions.fetchActors());
          this.store.dispatch(companiesActions.fetchCompanies());
          return actions.setFilms({films}) 
        }),
        catchError(() => EMPTY)
      ))
    ) 
  })

  constructor(
    private actions$: Actions,
    private filmsService: FilmsService,
    private spinnerService: SpinnerService,
    private store: Store<AppState>,
  ) {
    
  }
  
 
}