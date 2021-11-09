import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film!: Film;

  constructor() { }

  ngOnInit(): void {
  }

  getImage(image: string) {
    return image != null ? image : './assets/images/imageNotFound.jpg'
  }
}
