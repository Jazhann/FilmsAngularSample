import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ActorsService } from './actors.service';

import db from '@assets/data/db.json';

describe('ActorsService', () => {
  let service: ActorsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ActorsService ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ActorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get actors', async () => {
    let actors = [];
    service.getActors().subscribe(data => {
      actors = data;
    });
    const req = httpTestingController.expectOne(db.films);
    expect(req.request.method).toEqual('GET');
    req.flush(db.films); 
    expect(actors.length).toBeGreaterThan(0);
  });
});
