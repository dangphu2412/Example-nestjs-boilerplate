import {UfsaSecurityAdapter} from '@packages/ufsaModel/core/security/UfsaSecurityAdapter';
import {ExecutionContext} from '@nestjs/common';
import {JwtAuthAdapter} from '@packages/ufsaModel/core/security/JwtAuthAdapter';
import {CustomUserDetail} from '../modules/user/dto/CustomUserDetail';

export class RestApiSecurityBasedOnUfsa extends UfsaSecurityAdapter {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const {headers} = request;

        JwtAuthAdapter.builder()
            .applyHeader(headers)
            .updateUserDetailClass(CustomUserDetail)
            .extractBodyFromToken()
            .applyUserContextToReq(request);

        return true;
    }
}
