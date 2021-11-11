import { createReducer, on } from '@ngrx/store';
import { Company } from '../models/company.model';
import * as actions from './actions/companies.actions';


export const initialState: Company[] = [];

export const companiesReducer = createReducer(initialState,
  on( actions.setCompanies , (state, { companies }) => companies),
);

