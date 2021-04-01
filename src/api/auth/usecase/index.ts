import {Injectable} from '@nestjs/common';
import {UserService} from '../../../modules/user/service';
import {LoginUseCase} from './LoginUseCase';
import {DefaultLogin} from '../../../modules/user/dto/DefaultLogin';
import {SocialCase} from '../enum';

@Injectable()
export class LoginUseCaseImpl implements LoginUseCase {
    constructor(private service: UserService) { }

    defaultLogin(dto: DefaultLogin): any {
        return this.service.defaultLogin(dto);
    }

    socialLogin(dto: DefaultLogin, type: SocialCase): any {
        switch (type) {
            case SocialCase.FACEBOOK:
            case SocialCase.GOOGLE:
            default:
                return 'Hello login social';
        }
    }
}
