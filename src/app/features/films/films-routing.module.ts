import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFilmComponent } from './components/edit-film/edit-film.component';
import { FilmsComponent } from './films.component';

const routes: Routes = [
  {
    path: '', component: FilmsComponent,
  },
  {
    path: 'edit', component: EditFilmComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
