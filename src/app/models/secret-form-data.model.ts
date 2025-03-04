import { SecretType } from "./secret-type.enum";

export interface SecretFormData {
    fileContent: File;
    textContent: string;
    type: SecretType;
    password: string;
    lifetime: number;
    lifetimeType: number;
    usageLimit: number;
}