import { Component, inject, OnInit } from '@angular/core';
import { PasswordPromptComponent } from './password-prompt/password-prompt.component';
import { SecretComponent } from './secret/secret.component';
import { ApiService } from '../services/api.service';
import { SecretWithContent } from '../models/secret-with-content.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-page',
  imports: [PasswordPromptComponent, SecretComponent],
  templateUrl: './read-page.component.html',
  styleUrl: './read-page.component.scss',
})
export class ReadPageComponent {
  static path = 'secret/:id';
  secret?: SecretWithContent;

  private apiService: ApiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  secretUuid = this.route.snapshot.params['id'];

  onPasswordEntered(password: string) {
    if (!this.secret) {
      this.apiService
        .getSecret(this.secretUuid, password)
        .subscribe((secret) => {
          this.secret = secret;
        });
    }
  }
}
