import { SecretType } from "./secret-type.enum";

export interface SecretFormData {
    fileContent: string;
    textContent: string;
    type: SecretType;
    password: string;
    lifetime: number;
    lifetimeType: number;
    usageLimit: number;
}