import { createReducer, on } from '@ngrx/store';
import { Actor } from '../models/actor.model';
import * as actions from './actions/actors.actions';


export const initialState: Actor[] = [];

export const actorsReducer = createReducer(initialState,
  on( actions.setActors , (state, { actors }) => actors),
  on( actions.updateActorsFilms , (state, { filmId, oldActors, newActors }) => state.map(actor => {
      if(oldActors && oldActors.includes(actor.id)) {
        actor.movies.filter(movie => movie !== filmId)

      } 
      if (newActors.includes(actor.id)) {
        actor = {
          ...actor,
          movies: actor.movies.concat([filmId])
        };
      }
    return actor;
  }
  )),
);

