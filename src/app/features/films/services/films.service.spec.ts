import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;
  let store: MockStore;
  const initialState = { };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ 
        FilmsService,
        provideMockStore({ initialState }),
       ]
    });
    service = TestBed.inject(FilmsService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
