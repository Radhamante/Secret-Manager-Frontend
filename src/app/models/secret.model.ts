export interface Secret {
    id: string;
    content: string;
    password: string;
    lifetime: number;
    lifetimeType: string;
    usageLimit: number;
}