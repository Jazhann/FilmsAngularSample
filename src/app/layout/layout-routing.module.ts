import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
      },
      {
        path: 'error',
        component: ErrorComponent
      },
      {
        path: 'notFound',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
