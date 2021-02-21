export interface CreateUrlResponse {
  newUrl: string;
  endpoints: {
    redirecionaUrl: string;
    metodo: string;
  }[];
}
