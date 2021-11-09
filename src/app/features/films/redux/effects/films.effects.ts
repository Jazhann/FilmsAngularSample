import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { FilmsService } from '../../services/films.service';
import * as actions from '../actions/films.actions';


 
@Injectable()
export class FilmsEffects {
  
  loadFilms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.fetchFilms),
      switchMap(() => this.filmsService.getFilms()
      .pipe(
        map(films => actions.setFilms({films})),
        catchError(() => EMPTY)
      ))
    ) 
    })

  constructor(
    private actions$: Actions,
    private filmsService: FilmsService
  ) {
    
  }
  
 
}