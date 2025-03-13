import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  FunctionalTranspiler,
  provideTransloco,
  provideTranslocoTranspiler,
} from '@ngneat/transloco';
import { TranslocoHttpLoader } from './src/app/transloco-loader';
import { RouterModule } from '@angular/router';

export function setupGlobalProviders() {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideTransloco({
        config: {
          availableLangs: ['en', 'fr'],
          defaultLang: localStorage.getItem('language') || 'fr',
          reRenderOnLangChange: true,
        },
        loader: TranslocoHttpLoader,
      }),
      provideTranslocoTranspiler(FunctionalTranspiler),
    ],
    imports: [RouterModule.forRoot([])],
  });
}
