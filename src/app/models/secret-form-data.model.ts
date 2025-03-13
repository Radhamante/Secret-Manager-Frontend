import { SecretType } from './secret-type.enum';

export class SecretFormData {
  fileContent!: File;
  textContent!: string;
  type!: SecretType;
  password!: string;
  lifetime: number = 0;
  lifetimeType: number = 60;
  usageLimit: number = 0;

  constructor(data: Partial<SecretFormData> = {}) {
    Object.assign(this, data);
  }
}
