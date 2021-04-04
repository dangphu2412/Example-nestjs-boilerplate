import {INestApplication, Logger} from '@nestjs/common';
import {UserDetail} from '@packages/ufsaModel/core/user/UserDetail';
import {PermissionData, RuleData} from '@packages/ufsaModel/types/RulesType';
import {RuleValidator} from '@packages/ufsaModel/core/rule/RuleValidator';

export class AuthorizationContainer<T extends RuleData> {
  static logger: Logger = new Logger(AuthorizationContainer.name);

  private getInstanceFromDI: any = null;

  private rules: PermissionData<T>;

  /*
  PreAuthorize have this permission
  Then access rule in that permission
   */
  buildAuthValidator(user: UserDetail) {
      return new RuleValidator()
          .applyUserDetail(user)
          .applyGetDI(this.getInstanceFromDI)
          .applyRules(this.rules);
  }

  static builder() {
      AuthorizationContainer.logger.log('Bundling Authorization Ufsa model');
      return new AuthorizationContainer();
  }

  applyRules(rules: PermissionData<T>) {
      this.rules = rules;
      return this;
  }

  applyAppContext(app: INestApplication) {
      this.getInstanceFromDI = app.get;
      AuthorizationContainer
          .logger.log('Append method get DI from NestApplication');
      return this;
  }

}
