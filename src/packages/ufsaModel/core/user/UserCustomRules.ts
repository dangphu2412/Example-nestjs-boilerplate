import {UserDetail} from '@packages/ufsaModel/core/user/UserDetail';

export abstract class UserCustomRules extends UserDetail {
    public customRules: Record<string, boolean> = {};

    abstract toRules(req: any): void;
}
