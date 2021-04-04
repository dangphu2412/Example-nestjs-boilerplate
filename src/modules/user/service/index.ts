import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from 'src/entities';
import {UserRepository} from '../repository';
import {QueryContainer} from '@packages/restBuilder/core/QueryContainer';
import {BcryptService, BcryptSingleton} from '@packages/ufsaModel/core/security/BcryptService';
import {DefaultLogin} from '../dto/DefaultLogin';
import {UserLoginDetail} from '../dto/UserLoginDetail';
import {Optional} from '../../../utils/entityHelper/Optional';
import {BadRequestException} from '@common/exceptions';
import {sign} from 'jsonwebtoken';
import {toJwtPayload} from '../mapper/JwtPayload';
import {PreAuthorize} from '@packages/ufsaModel/decorators/PreAuthorize';
import {CustomUserDetail} from '../dto/CustomUserDetail';
import {authorizationContainer} from '@config/authorizationContainer';

@Injectable()
export class UserService {
    private static logger: Logger = new Logger(UserService.name);

    private bcryptService: BcryptService;

    constructor(
        @InjectRepository(User)
        private moduleRepository: UserRepository,
    ) {
        this.bcryptService = BcryptSingleton;
    }

    @PreAuthorize('UPDATE_PUBLIC_TASK')
    public async findAll(authContext: CustomUserDetail, request: QueryContainer) {
        await authorizationContainer
            .buildAuthValidator(authContext)
            .addRule('UPDATE_PUBLIC_TASK', [1, 2])
            .validate();
        return this.moduleRepository.findAll(request);
    }

    public async defaultLogin(dto: DefaultLogin): Promise<UserLoginDetail> {
        const {username} = dto;

        const currentUser: User = Optional
            .of(await this.moduleRepository.findByUsernameWithRoles(username))
            .getIfPresent()
            .orElseThrow(() => new BadRequestException(
                'Your username or password is not correct'
            ));
        const token = sign(toJwtPayload(currentUser), 'Fusdeptrai');
        return new UserLoginDetail(token, username);
    }
}
