export interface ExpiredUrlResponse {
  message: string;
  expired: boolean;
  endpoints: {
    encurtaUrl: string;
    body: string;
  }[];
}
