import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { RoundedButtonDirective } from '../shared/roundedButton.directive';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { LoginComponent } from './login/login.component';
import { GradientDirective } from '../shared/gradient-button.directive';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink,
    TranslocoPipe,
    RoundedButtonDirective,
    ModalComponent,
    LoginComponent,
    GradientDirective,
    RegisterComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService: AuthService = inject(AuthService);

  constructor() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    }
  }

  // LOGIN
  isUserLogged = false;
  isLoginModalOpen = false;
  onToggleLoginModal(isOpen: boolean) {
    this.isLoginModalOpen = isOpen;
  }
  onNoAccountClick() {
    this.isLoginModalOpen = false;
    this.isRegisterModalOpen = true;
  }
  onUserLogged() {
    this.isLoginModalOpen = false;
    this.isUserLogged = true;
  }

  // LOGOUT
  onLogout() {
    this.authService.logout();
    this.isUserLogged = false;
  }

  // REGISTER
  isRegisterModalOpen = false;
  onToggleRegisterModal(isOpen: boolean) {
    this.isRegisterModalOpen = isOpen;
  }
  onAlreadyAccountClick() {
    this.isRegisterModalOpen = false;
    this.isLoginModalOpen = true;
  }
  onUserRegistered() {
    this.isRegisterModalOpen = false;
    this.isLoginModalOpen = true;
  }

  // LANGUAGE
  isLanguageOpen = false;
  private translocoService = inject(TranslocoService);
  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];
  currentLanguage =
    this.languages.find(
      (language) => language.code === localStorage.getItem('language')
    ) || this.languages[0];
  changeLanguage(language: any) {
    this.translocoService.setActiveLang(language.code);
    this.currentLanguage = language;
    localStorage.setItem('language', language.code);
    // Ajoutez ici la logique pour changer la langue de votre application
    console.log('Langue sélectionnée :', language.code);
  }

  // DARK MODE
  isDarkMode: boolean = localStorage.getItem('darkmode') == 'true';

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
