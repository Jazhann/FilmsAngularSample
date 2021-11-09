import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '@shared/services/layout.service';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Film } from './models/film.model';

import * as actions from './redux/actions/films.actions';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films$: Observable<Film[]> = this.store.select('films');

  constructor(
    private store: Store<AppState>,
    private layoutService: LayoutService,
    private translate: TranslateService
  ) { 

  }

  ngOnInit(): void {
    this.layoutService.setTitle(this.translate.instant('films.title'));
    this.store.dispatch(actions.fetchFilms());
  }

}
