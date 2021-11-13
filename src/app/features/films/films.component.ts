import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '@shared/services/layout.service';
import { SpinnerService } from '@shared/services/spinner.service';

import { Constants } from '@shared/constants';
import { AppState } from '@core/app.reducer';

import { Film } from './models/film.model';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  CONST = Constants;
  films$: Observable<Film[]> = this.store.select(state => state.films);

  constructor(
    private layoutService: LayoutService,
    private store: Store<AppState>,
    private translate: TranslateService,
    private spinnerService: SpinnerService,
  ) { 

  }

  ngOnInit(): void {
    this.layoutService.setTitle(this.translate.instant(Constants.FILMS_TITLE));
  }

  showSpinner() {
    return this.spinnerService.status();
  }

}
