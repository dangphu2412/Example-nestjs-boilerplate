import {UserPrinciple} from '@packages/ufsaModel/core/user/UserPrinciple';
import {RoleAccessControlList} from '@packages/ufsaModel/core/user/RoleAccessControlList';

export class UserDetail implements UserPrinciple {
    public userId: number;

    public username: string;

    public email: string;

    public roles: string[];

    public permissions: Record<string, boolean>;

    constructor({userId, username, email}: any) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.roles = [];
        this.permissions = {};
    }

    toRolesAndPermissions(user: any): void {
        const racl: RoleAccessControlList[] | string[] = user.roles;

        if (Array.isArray(racl) ) {
            racl.forEach((item: RoleAccessControlList | string) => {
                if (typeof item === 'string') {
                    this.roles.push(item);
                } else {
                    this.roles.push(item.name);
                    this.appendPermission(item.permissions);
                }
            })
        }
    }

    /**
     * @param permissions
     * @notes Override this function to append new rules for permission
     */
    appendPermission(permissions: string[]): void {
        if (Array.isArray(permissions)) {
            permissions.forEach(item => {
                this.permissions[item] = true;
            })
        }
    }

    isAccountLocked(): boolean {
        return false;
    }

    isAuthenticated(): boolean {
        return false;
    }

    isCredentialsExpired(): boolean {
        return false;
    }
}
