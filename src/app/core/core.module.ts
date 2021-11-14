import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FilmsModule } from '@features/films/films.module';

import { environment } from '@env/environment';

import { appReducers } from './app.reducer';

import { FilmsEffects } from '@features/films/store/effects/films.effects';
import { ActorsEffects } from '@features/actors/store/effects/actors.effects';
import { CompaniesEffects } from '@features/companies/store/effects/companies.effects';

import { ActorsModule } from '@features/actors/actors.module';
import { CompaniesModule } from '@features/companies/companies.module';
import { ErrorComponent } from './components/error/error.component';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule.forChild(),
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
    }),
    EffectsModule.forRoot([FilmsEffects, ActorsEffects, CompaniesEffects]),
    FilmsModule,
    ActorsModule,
    CompaniesModule,
    MatButtonModule,
  ]
})
export class CoreModule { }
