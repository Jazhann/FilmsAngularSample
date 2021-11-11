import { createReducer, on } from '@ngrx/store';
import { Actor } from '../models/actor.model';
import * as actions from './actions/actors.actions';


export const initialState: Actor[] = [];

export const actorsReducer = createReducer(initialState,
  on( actions.setActors , (state, { actors }) => actors),
);

