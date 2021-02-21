import { Injectable } from '@nestjs/common';

export interface EmptyCallResponse {
  message: string;
  status: number;
}

@Injectable()
export class AppService {
  emptyCall(): EmptyCallResponse {
    const response = {
      status: 400,
      message: 'É necessário passar uma url encurtada para prosseguir!',
    };

    return response;
  }
}
