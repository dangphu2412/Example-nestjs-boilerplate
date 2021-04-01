import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {JwtAuthAdapter} from '@packages/ufsaModel/core/security/JwtAuthAdapter';

export const AuthContext = createParamDecorator(
    (data: string, ctx: ExecutionContext): any => {
        const user: any = ctx
            .switchToHttp()
            .getRequest()
            [JwtAuthAdapter.AUTH_CONTEXT];

        if (!user) {
            return null;
        }

        return data ? user[data] : user;
    },
);
