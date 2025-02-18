import { Component, Input, OnInit } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { SecretFileResponse } from '../../models/secret-file-response.model';

@Component({
  selector: 'app-secret-file',
  imports: [TranslocoPipe, GradientDirective],
  templateUrl: './secret-file.component.html',
  styleUrl: './secret-file.component.scss',
})
export class SecretFileComponent implements OnInit {
  @Input({ required: true }) secret!: SecretFileResponse;
  private a = document.createElement('a');

  ngOnInit() {
    this.a.href = URL.createObjectURL(this.secret.blob);
    this.a.download = this.secret.fileName;
    this.downloadSecretFile();
  }

  downloadSecretFile() {
    document.body.appendChild(this.a);
    this.a.click();
    document.body.removeChild(this.a);
  }
}
