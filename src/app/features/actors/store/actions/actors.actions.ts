import { createAction, props } from '@ngrx/store';
import { Constants } from '@shared/constants';
import { Actor } from '../../models/actor.model';


export const fetchActors = createAction(
    Constants.ACTION_ACTORS_FETCH
);

export const errorLoadingData = createAction(
    Constants.ACTION_ACTORS_ERROR
);

export const setActors = createAction(
    Constants.ACTION_ACTORS_SET,
    props<{ actors: Actor[] }>()
);

export const updateActorsFilms = createAction(
    Constants.ACTION_ACTORS_UPDATE_FILMS,
    props<{ filmId: number, oldActors?: number[], newActors: number[] }>()
);


