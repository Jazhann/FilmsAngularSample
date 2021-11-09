import { createAction, props } from '@ngrx/store';
import { Film } from '../../models/film.model';


export const fetchFilms = createAction(
    '[Films] Fetch Films'
);

export const setFilms = createAction(
    '[Films] Set Films',
    props<{ films: Film[] }>()
);

