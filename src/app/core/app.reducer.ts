import { ActionReducerMap } from '@ngrx/store';
import { Film } from '@features/films/models/film.model';
import { filmsReducer } from '@features/films/store/films.reducer';


export interface AppState {
    films: Film[]
}

export const appReducers: ActionReducerMap<AppState> = {
    films: filmsReducer
}