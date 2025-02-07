import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BackgroundComponent } from "./shared/background/background.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'secretManager';
}
