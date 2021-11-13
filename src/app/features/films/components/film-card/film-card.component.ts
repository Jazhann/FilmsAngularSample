import { Component, Input } from '@angular/core';
import { FilmsService } from '@features/films/services/films.service';

import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {
  @Input() film!: Film;

  constructor(
    private filmsService: FilmsService
  ) { }

  getImage(url: string) {
    return this.filmsService.getImage(url);
  }
}
