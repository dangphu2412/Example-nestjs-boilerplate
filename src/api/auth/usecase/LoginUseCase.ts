import {DefaultLogin} from '../../../modules/user/dto/DefaultLogin';
import {SocialCase} from '../enum';
import {UserLoginDetail} from '../../../modules/user/dto/UserLoginDetail';

export interface LoginUseCase {
    defaultLogin(dto: DefaultLogin): any;
    socialLogin(dto: DefaultLogin, type: SocialCase): UserLoginDetail;
}
