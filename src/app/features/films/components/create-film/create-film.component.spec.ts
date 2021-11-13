import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from '@features/films/services/films.service';
import { LayoutService } from '@shared/services/layout.service';

import { CreateFilmComponent } from './create-film.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('CreateFilmComponent', () => {
  let component: CreateFilmComponent;
  let fixture: ComponentFixture<CreateFilmComponent>;
  let store: MockStore;
  const initialState = { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ CreateFilmComponent ],
      providers: [ 
        LayoutService,
        FilmsService,
        
        provideMockStore({ initialState }),
       ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
