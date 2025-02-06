import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];
  isOpen = false;

  currentLanguage = this.languages[0]; // Langue par défaut

  private translocoService = inject(TranslocoService);

  changeLanguage(language: any) {
    this.translocoService.setActiveLang(language.code);
    this.currentLanguage = language;
    // Ajoutez ici la logique pour changer la langue de votre application
    console.log('Langue sélectionnée :', language.code);
  }
}
