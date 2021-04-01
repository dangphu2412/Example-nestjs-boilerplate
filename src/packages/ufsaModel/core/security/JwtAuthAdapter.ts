import {decode} from 'jsonwebtoken';
import {AuthEnum} from '@packages/ufsaModel/enum/auth.enum';
import {UnauthorizedException} from '@common/exceptions';
import {UserDetail} from '@packages/ufsaModel/core/user/UserDetail';
import {UserCustomRules} from '@packages/ufsaModel/core/user/UserCustomRules';
import {Constructor} from '@nestjs/common/utils/merge-with-values.util';


export class JwtAuthAdapter {
    public static AUTH_CONTEXT = 'AuthContext';

    private static CLASS_USER_DETAIL = UserDetail;

    private headerContent: string = null;

    private accessToken: string = null;

    private body: any = null;

    static builder(): JwtAuthAdapter {
        return new JwtAuthAdapter();
    }

    private collectAccessToken(): this {
        if (this.headerContent.startsWith(AuthEnum.PREFIX_HEADER)) {
            this.accessToken = this.headerContent.substring(AuthEnum.PREFIX_HEADER.length);
        }

        return this;
    }

    applyHeader(headers: any): this {
        this.headerContent = headers[AuthEnum.HEADER];

        if (this.headerContent) {
            this.collectAccessToken();
        }
        return this;
    }

    applyUserContextToReq(req: any): void {
        if (!this.body) {
            return;
        }
        const authContext = new JwtAuthAdapter.CLASS_USER_DETAIL(this.body);

        authContext.toRolesAndPermissions(this.body);

        if (authContext instanceof UserCustomRules) {
            authContext.toRules(this.body);
        }

        req[JwtAuthAdapter.AUTH_CONTEXT] = authContext;

        return;
    }

    updateUserDetailClass(userDetailClass: Constructor<UserDetail>): this {
        JwtAuthAdapter.CLASS_USER_DETAIL = userDetailClass;
        return this;
    }

    extractBodyFromToken() {
        if (this.accessToken) {
            try {
                this.body = decode(this.accessToken);
            } catch (e) {
                throw new UnauthorizedException();
            }
        }

        return this;
    }
}
