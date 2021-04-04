import {UserDetail} from '@packages/ufsaModel/core/user/UserDetail';
import {InvalidArgumentResource} from '@packages/ufsaModel/exceptions/InvalidArgumentResource';
import {UserCustomRules} from '@packages/ufsaModel/core/user/UserCustomRules';
import {ForbiddenException} from '@common/exceptions';

export const PreAuthorize = (
    permissionRequired: string,
    roleRequired?: string,
    customRuleRequired?: string
): MethodDecorator => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-types
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const method = descriptor.value;
        descriptor.value = function(...agrs: any[]) {
            const userDetail = agrs[0];
            let isRolePermitted = true;
            let isPermissionPermitted = true;
            const isCustomRulePermitted = true;

            if (!userDetail) {
                throw new ForbiddenException();
            }

            if (!(userDetail instanceof UserDetail)) {
                throw new InvalidArgumentResource(propertyKey);
            }

            if (userDetail.permissions) {
                isPermissionPermitted = userDetail.permissions[permissionRequired]
            } else {
                throw new ForbiddenException();
            }

            if (roleRequired) {
                if (Array.isArray(userDetail.roles)) {
                    isRolePermitted = userDetail.roles.some(
                        role => role === roleRequired
                    );
                } else {
                    throw new ForbiddenException();
                }
            }

            if (customRuleRequired) {
                if ((userDetail instanceof UserCustomRules) && Array.isArray(userDetail)) {
                    isPermissionPermitted = userDetail.customRules[customRuleRequired]
                } else {
                    throw new ForbiddenException();
                }
            }

            if (!isRolePermitted
              || !isPermissionPermitted
              || !isCustomRulePermitted) {
                throw new ForbiddenException();
            }

            return method.apply(this, agrs);
        }

    }
};

