import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from './services/layout.service';
import { SpinnerService } from './services/spinner.service';



@NgModule({
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        LayoutService,
        SpinnerService
      ],
    };
  }
}
