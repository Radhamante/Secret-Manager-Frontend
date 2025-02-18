import { Component, inject, OnInit } from '@angular/core';
import { PasswordPromptComponent } from './password-prompt/password-prompt.component';
import { SecretComponent } from './secret/secret.component';
import { ApiService } from '../services/api.service';
import { SecretWithContent } from '../models/secret-with-content.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDirective } from '../shared/card.directive';
import { TranslocoPipe } from '@ngneat/transloco';
import { SecretFileComponent } from './secret-file/secret-file.component';
import { SecretFileResponse } from '../models/secret-file-response.model';

@Component({
  selector: 'app-read-page',
  imports: [
    PasswordPromptComponent,
    SecretComponent,
    SecretFileComponent,
    CardDirective,
    TranslocoPipe,
  ],
  templateUrl: './read-page.component.html',
  styleUrl: './read-page.component.scss',
})
export class ReadPageComponent implements OnInit {
  static path = 'secret/:id';
  secretText?: SecretWithContent;
  secretFile?: SecretFileResponse;

  private apiService: ApiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  private secretType!: string;

  secretUuid = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.apiService.getSecretType(this.secretUuid).subscribe((type) => {
      this.secretType = type;
    });
  }

  onPasswordEntered(password: string) {
    if (this.secretType === 'text') {
      this.apiService
        .getSecretText(this.secretUuid, password)
        .subscribe((secret: SecretWithContent) => {
          console.log(secret);
          this.secretText = secret;
        });
    } else if (this.secretType === 'file') {
      this.apiService
        .getSecretFile(this.secretUuid, password)
        .subscribe((secret: SecretFileResponse) => {
          this.secretFile = secret;
        });
    }
  }
}
