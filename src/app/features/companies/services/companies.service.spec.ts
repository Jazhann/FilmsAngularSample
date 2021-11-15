import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import db from '@assets/data/db.json';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CompaniesService ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get companies', async () => {
    let companies = [];
    service.getCompanies().subscribe(data => {
      companies = data;
    });
    const req = httpTestingController.expectOne(db.films);
    expect(req.request.method).toEqual('GET');
    req.flush(db.films); 
    expect(companies.length).toBeGreaterThan(0);
  });
});
