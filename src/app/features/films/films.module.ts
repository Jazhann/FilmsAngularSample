import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmCardComponent } from './components/film-card/film-card.component';

import { MatCardModule } from '@angular/material/card';
import { FilmsService } from './services/films.service';



@NgModule({
  declarations: [
    FilmsComponent,
    FilmCardComponent,
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatCardModule,
  ],
  providers: [
    FilmsService,
  ]
})
export class FilmsModule { }
