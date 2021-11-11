import { createAction, props } from '@ngrx/store';
import { Constants } from '@shared/constants';
import { Film } from '../../models/film.model';


export const fetchFilms = createAction(
    Constants.ACTION_FILMS_FETCH
);

export const setFilms = createAction(
    Constants.ACTION_FILMS_SET,
    props<{ films: Film[] }>()
);

export const updateFilm = createAction(
    Constants.ACTION_FILMS_UPDATE,
    props<{ film: Film }>()
);

export const deleteFilm = createAction(
    Constants.ACTION_FILMS_DELETE,
    props<{ filmId: number }>()
);
