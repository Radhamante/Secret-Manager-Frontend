import { SecretType } from './secret-type.enum';
import { Secret } from './secret.model';

export class SecretWithContent extends Secret {
  constructor(
    uuid: string,
    creation: Date,
    destruction: Date | undefined,
    usageLimit: number,
    usageCount: number,
    type: SecretType,
    public content: string
  ) {
    super(uuid, creation, destruction, usageLimit, usageCount, type);
  }
}
