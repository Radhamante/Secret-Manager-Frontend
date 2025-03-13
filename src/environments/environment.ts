export const environment = {
  apiURL:
    (window as any)['env'] && (window as any)['env']['API_URL']
      ? (window as any)['env']['API_URL']
      : 'https://api.secret.radhamante.fr',
};