import { createReducer, on } from '@ngrx/store';
import { Company } from '../models/company.model';
import * as actions from './actions/companies.actions';


export const initialState: Company[] = [];

export const companiesReducer = createReducer(initialState,
  on( actions.setCompanies , (state, { companies }) => companies),
  on( actions.updateCompaniesFilms , (state, { filmId, oldCompany, newCompany }) => state.map(company => {
    switch(company.id) {
      case oldCompany: 
        company.movies.filter(movie => movie !== filmId)
        break;
      case newCompany:
        company = {
          ...company,
          movies: company.movies.concat([filmId])
        };
        break;
      default:
        break;
    }
    return company;
  }
  )),
);

