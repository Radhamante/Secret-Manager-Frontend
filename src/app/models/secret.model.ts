import { SecretType } from './secret-type.enum';

export class Secret {
  constructor(
    public uuid: string,
    public creation: Date,
    public destruction: Date | undefined,
    public usageLimit: number | undefined,
    public usageCount: number,
    public type: SecretType
  ) {}
}
