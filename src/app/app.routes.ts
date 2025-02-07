import { Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { ReadPageComponent } from './read-page/read-page.component';

export const routes: Routes = [
  {
    path: CreatePageComponent.path,
    component: CreatePageComponent,
  },
  {
    path: ReadPageComponent.path,
    component: ReadPageComponent,
  },
];
