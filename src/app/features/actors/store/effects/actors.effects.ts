import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ActorsService } from '../../services/actors.service';
import * as actions from '../actions/actors.actions';
import { SpinnerService } from '@shared/services/spinner.service';

import { Constants } from '@shared/constants';


 
@Injectable()
export class ActorsEffects {
  
  loadActors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.fetchActors),
      switchMap(() => this.actorsService.getActors()
        .pipe(
          map(actors => {
            this.spinnerService.hide();
            return actions.setActors({actors}) 
          }),
          catchError(() => {
            this.spinnerService.hide();
            return of( actions.errorLoadingData())
          })
        )
      ) 
  )});

  goToErrorPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.errorLoadingData),
      tap(() => this.router.navigate([Constants.ROUTE_ERROR]))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private actorsService: ActorsService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

}