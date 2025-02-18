export const environment = {
  production: false,
  apiURL: (window as any)['env']['API_URL'] || "http://localhost:8081",
};