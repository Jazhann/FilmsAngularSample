import { ActionReducerMap } from '@ngrx/store';

import { Film } from '@features/films/models/film.model';
import { Actor } from '@features/actors/models/actor.model';
import { Company } from '@features/companies/models/company.model';

import { filmsReducer } from '@features/films/store/films.reducer';
import { actorsReducer } from '@features/actors/store/actors.reducer';
import { companiesReducer } from '@features/companies/store/companies.reducer';


export interface AppState {
    films: Film[],
    actors: Actor[],
    companies: Company[],
}

export const appReducers: ActionReducerMap<AppState> = {
    films: filmsReducer,
    actors: actorsReducer,
    companies: companiesReducer
}