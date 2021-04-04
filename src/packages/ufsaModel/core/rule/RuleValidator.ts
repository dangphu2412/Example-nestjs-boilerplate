import {UserDetail} from '@packages/ufsaModel/core/user/UserDetail';
import {Validator} from '@packages/restBuilder/modules/Validator/Validator';
import {PermissionData, RuleData} from '@packages/ufsaModel/types/RulesType';
import {ForbiddenException} from '@common/exceptions';

/*
 If type true => Promise
 else normal function
 */
export interface RuleExecution {
    methodName: string,
    service: string,
    args: any[]
}

export class RuleValidator<T extends UserDetail, R extends RuleData>
implements Validator<void>{

    private ruleExecutionContexts: RuleExecution[] = [];

    private rules: PermissionData<R>;

    private getDI: any = null;

    private userDetail: T;

    static builder() {
        return new RuleValidator();
    }

    private transformToMethod(rule: string, args: any[]): RuleExecution {
        const [service, methodName] = this.rules[rule].method.split('.');
        return {
            service,
            methodName,
            args
        };
    }

    applyUserDetail(user: T) {
        this.userDetail = user;
        return this;
    }

    applyGetDI(instanceRef: any) {
        this.getDI = instanceRef;
        return this;
    }

    applyRules(rules: PermissionData<R>) {
        this.rules = rules;
        return this;
    }

    addRule(rule: string, args: any[]) {
        this.ruleExecutionContexts.push(
            this.transformToMethod(rule, args)
        )
        return this;
    }

    async validate(): Promise<void> {
        while(this.ruleExecutionContexts.length > 0) {
            const context = this.ruleExecutionContexts.pop();
            const isPassed = await this.getDI(context.service)
                [context.methodName](...context.args);

            if (!isPassed) {
                throw new ForbiddenException();
            }
        }
    }
}
