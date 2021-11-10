import { Component, Input } from '@angular/core';

import { Constants } from '@shared/constants';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {
  @Input() film!: Film;

  constructor() { }

  getImage(image: string) {
    return image != null ? image : Constants.ROUTE_IMAGE_NOT_FOUND;
  }
}
