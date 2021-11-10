import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FilmsComponent } from './films.component';
import { FilmCardComponent } from './components/film-card/film-card.component';

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
    MatProgressSpinnerModule
  ],
  providers: [
    FilmsService,
  ]
})
export class FilmsModule { }
