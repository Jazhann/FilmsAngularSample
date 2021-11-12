import { createAction, props } from '@ngrx/store';
import { Constants } from '@shared/constants';
import { Company } from '../../models/company.model';


export const fetchCompanies = createAction(
    Constants.ACTION_COMPANIES_FETCH
);

export const setCompanies = createAction(
    Constants.ACTION_COMPANIES_SET,
    props<{ companies: Company[] }>()
);

export const updateCompaniesFilms = createAction(
    Constants.ACTION_COMPANIES_UPDATE_FILMS,
    props<{ filmId: number, oldCompany?: number, newCompany: number }>()
);
