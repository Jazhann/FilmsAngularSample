import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFilmComponent } from './components/create-film/create-film.component';
import { EditFilmComponent } from './components/edit-film/edit-film.component';
import { FilmsComponent } from './films.component';

const routes: Routes = [
  {
    path: '', component: FilmsComponent,
  },
  {
    path: 'edit/:id', component: EditFilmComponent,
  },
  {
    path: 'create', component: CreateFilmComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
