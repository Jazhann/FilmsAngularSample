import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FilmsService } from '../../services/films.service';
import * as actions from '../actions/films.actions';
import * as actorsActions from '@features/actors/store/actions/actors.actions';
import * as companiesActions from '@features/companies/store/actions/companies.actions';


 
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
        catchError(() => EMPTY)
      ))
    ) 
  })

  constructor(
    private actions$: Actions,
    private filmsService: FilmsService,
  ) {}
}