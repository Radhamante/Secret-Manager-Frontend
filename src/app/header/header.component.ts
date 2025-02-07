import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];
  isOpen = false;

  currentLanguage = this.languages.find(
    (language) => language.code === localStorage.getItem('language')
  );

  private translocoService = inject(TranslocoService);
  isDarkMode: boolean = localStorage.getItem('darkmode') == 'true';

  constructor() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    }
    if (!this.currentLanguage) {
      this.currentLanguage = this.languages[0];
      localStorage.setItem('language', this.currentLanguage.code);
    }
  }

  changeLanguage(language: any) {
    this.translocoService.setActiveLang(language.code);
    this.currentLanguage = language;
    localStorage.setItem('language', language.code);
    // Ajoutez ici la logique pour changer la langue de votre application
    console.log('Langue sélectionnée :', language.code);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkmode', this.isDarkMode ? 'true' : 'false');
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
