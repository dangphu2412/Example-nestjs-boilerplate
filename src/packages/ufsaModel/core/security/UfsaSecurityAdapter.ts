import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';

import {JwtAuthAdapter} from './JwtAuthAdapter';
import {UserExtractor, UserExtractorSingleton} from '@packages/ufsaModel/core/user/UserExtractor';

@Injectable()
export class UfsaSecurityAdapter implements CanActivate {
    private userExtractor: UserExtractor;

    constructor() {
        this.userExtractor = UserExtractorSingleton;
    }

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
