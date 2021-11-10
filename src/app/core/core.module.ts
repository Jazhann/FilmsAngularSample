import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FilmsModule } from '@features/films/films.module';

import { environment } from '@env/environment';

import { appReducers } from './app.reducer';

import { FilmsEffects } from '@features/films/store/effects/films.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
    }),
    EffectsModule.forRoot([FilmsEffects]),
    FilmsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
