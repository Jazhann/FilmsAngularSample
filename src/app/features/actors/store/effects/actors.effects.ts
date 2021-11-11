import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ActorsService } from '../../services/actors.service';
import * as actions from '../actions/actors.actions';
import { SpinnerService } from '@shared/services/spinner.service';


 
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
        catchError(() => EMPTY)
      ))
    ) 
  })

  constructor(
    private actions$: Actions,
    private actorsService: ActorsService,
    private spinnerService: SpinnerService
  ) {
    
  }
  
 
}