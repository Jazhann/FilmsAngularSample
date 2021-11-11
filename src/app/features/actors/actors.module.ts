import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsService } from './services/actors.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ActorsService,
  ]
})
export class ActorsModule { }
