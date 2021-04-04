import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';

import {JwtAuthAdapter} from './JwtAuthAdapter';

@Injectable()
export class UfsaSecurityAdapter implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const {headers} = request;

        JwtAuthAdapter.builder()
            .applyHeader(headers)
            .extractBodyFromToken()
            .applyUserContextToReq(request);

        return true;
    }
}
