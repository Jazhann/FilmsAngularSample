import { createReducer, on } from '@ngrx/store';
import { Film } from '../models/film.model';
import * as actions from './actions/films.actions';


export const initialState: Film[] = [];

export const filmsReducer = createReducer(initialState,
  on( actions.setFilms , (state, { films }) => films),
);

