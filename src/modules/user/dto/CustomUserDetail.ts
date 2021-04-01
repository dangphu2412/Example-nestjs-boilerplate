import {UserCustomRules} from '@packages/ufsaModel/core/user/UserCustomRules';
import {RoleAccessControlList} from '@packages/ufsaModel/core/user/RoleAccessControlList';

export class CustomUserDetail extends UserCustomRules {
    toRules(user: any): void {
        const roles: RoleAccessControlList[] = user.roles;
        roles.forEach(r => {
            if (Array.isArray(r.permissions)) {
                r.permissions.forEach(p => {
                    const rule = this.toRule(r.name, p);
                    if (Object(this.customRules).contains(rule)) {
                        this.customRules[rule] = true;
                    }
                })
            }
        })
    }

    toRule(role: string, per: string): string {
        return `${role}-${per}`;
    }
}
