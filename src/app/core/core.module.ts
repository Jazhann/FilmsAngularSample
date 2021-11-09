import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmsModule } from '../features/films/films.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from 'src/app/app.reducer';
import { FilmsEffects } from '../features/films/redux/effects/films.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FilmsModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
    }),
    EffectsModule.forRoot([FilmsEffects])
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
