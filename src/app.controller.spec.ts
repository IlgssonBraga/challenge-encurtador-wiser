import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  const appservice = new AppService();
  const appController = new AppController(appservice);

  describe('root', () => {
    it('should return a error message with status 400 when none params is passed.', () => {
      const response = appController.getHello();
      expect(response).toEqual({"message": "É necessário passar uma url encurtada para prosseguir!", "status": 400});
    });
  });
});
