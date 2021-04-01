import {User} from '../../../entities';

export interface JwtPayload {
  userId: number;
  username: string;
  roles: string[];
}

export function toJwtPayload(user: User): JwtPayload {
    return {
        userId: user.id,
        username: user.username,
        roles: user.roles.map(role => role.name)
    }
}
