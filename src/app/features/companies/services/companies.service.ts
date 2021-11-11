import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '../models/company.model';

import { environment } from '@env/environment';
import { Constants } from '@shared/constants';


@Injectable()
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanies (): Observable<Company []> {
    return this.http.get<Company[]>(environment.apiUrl + Constants.ROUTE_API_COMPANIES);
  }
}
