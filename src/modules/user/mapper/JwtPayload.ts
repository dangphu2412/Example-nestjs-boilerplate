import {User} from '../../../entities';
import {ROLE} from '../../../rules';

export interface JwtPayload {
  userId: number;
  username: string;
  roles: string[];
  permissions: string[];
}

function flatPerFromRole(roles: string[]) {
    const finalPermissions: string[] = [];
    roles.forEach(role => {
        ROLE[role].permissions.forEach(per => {
            finalPermissions.push(per);
        })
    });
    return finalPermissions;
}

export function toJwtPayload(user: User): JwtPayload {
    const roles: string[] = user.roles.map(role => role.name);
    return {
        userId: user.id,
        username: user.username,
        roles,
        permissions: flatPerFromRole(roles)
    }
}
