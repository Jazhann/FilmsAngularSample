import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesService } from './services/companies.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CompaniesService,
  ]
})
export class CompaniesModule { }
