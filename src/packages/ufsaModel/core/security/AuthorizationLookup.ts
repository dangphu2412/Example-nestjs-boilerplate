import {INestApplication, Logger} from '@nestjs/common';
import {UnauthorizedException} from '@common/exceptions';

export class AuthorizationLookup {
  static logger: Logger = new Logger(AuthorizationLookup.name);

  static DIisReady = false;

  static getInstanceFromDI: any = null;

  static queue: any[] = [];

  static triggerPreAuth(containerName: string, methodName: string) {
      AuthorizationLookup.logger.log(
          `Collecting ${containerName} with method to Authorization DI`
      );
      AuthorizationLookup.queue.push(
          {
              container: containerName,
              method: methodName
          }
      );
  }

  static async eventLoop() {
      while(AuthorizationLookup.DIisReady) {
          if (AuthorizationLookup.queue.length > 0) {
              const instanceQueue = AuthorizationLookup.queue.pop();
              const task =
                AuthorizationLookup
                    .getInstanceFromDI(
                        instanceQueue.container
                    )[instanceQueue.method];
              const data = await task(1, 2);
              throw new UnauthorizedException();
          } else {
              console.log('===== Looping for auth ====');
          }
      }
  }

  static builder() {
      AuthorizationLookup.logger.log('Bundling Authorization Ufsa model');
      return new AuthorizationLookup();
  }

  applyAppContext(app: INestApplication) {
      AuthorizationLookup.getInstanceFromDI = app.get;
      AuthorizationLookup
          .logger.log('Append method get DI from NestApplication');
      return this;
  }
}
