import { createReducer, on } from '@ngrx/store';
import { Film } from '../models/film.model';
import * as actions from './actions/films.actions';


export const initialState: Film[] = [];

export const filmsReducer = createReducer(initialState,
  on( actions.setFilms , (state, { films }) => films),
  on( actions.updateFilm , (state, { film }) => state.map( filmSaved => {
      return filmSaved.id === film.id ? film : filmSaved;
    }
  )),
  on( actions.deleteFilm , (state, { filmId }) => state.filter(film => film.id !== filmId)),
);

