import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/films',
        pathMatch: 'full',
      },
      {
        path: 'films',
        loadChildren: () => import('../features/films/films.module').then(m => m.FilmsModule)
      },
      {
        path: 'actors',
        redirectTo: '/films',
        pathMatch: 'full',
      },
      {
        path: 'companies',
        redirectTo: '/films',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
