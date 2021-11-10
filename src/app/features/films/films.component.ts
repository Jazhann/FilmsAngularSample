import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '@shared/services/layout.service';

import { Constants } from '@shared/constants';
import { AppState } from '@core/app.reducer';
import { Film } from './models/film.model';
import * as actions from './store/actions/films.actions';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films$: Observable<Film[]> = this.store.select(state => state.films);

  constructor(
    private layoutService: LayoutService,
    public spinnerService: SpinnerService,
    private store: Store<AppState>,
    private translate: TranslateService,
  ) { 

  }

  ngOnInit(): void {
    this.layoutService.setTitle(this.translate.instant(Constants.FILMS_TITLE));
    this.spinnerService.show();
    this.store.dispatch(actions.fetchFilms());
  }

}
