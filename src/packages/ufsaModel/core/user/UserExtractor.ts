import {UserPrinciple} from '@packages/ufsaModel/core/user/UserPrinciple';

export class UserExtractor {
    private userDetail: UserPrinciple;

    extractUserInfo(userDetail: UserPrinciple, req: any) {
        req.user = userDetail;
    }

    retrieveUserInfo(req: any) {
        return req?.user;
    }
}

export const UserExtractorSingleton = new UserExtractor();
