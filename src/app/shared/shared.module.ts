import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Globals } from './globals';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { LayoutService } from './services/layout.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    isolate: false,
    extend:true
    }),
  ],
  exports: [
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        Globals,
        LayoutService
      ],
    };
  }
}
