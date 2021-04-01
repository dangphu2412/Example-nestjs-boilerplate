import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from '../service';
import {UserController} from '../../../api/user/controller';
import {UserRepository} from '../repository';
import {AuthController} from '../../../api/auth/controller';
import {LoginUseCaseImpl} from '../../../api/auth/usecase';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository
        ])
    ],
    controllers: [UserController, AuthController],
    providers: [
        UserService, LoginUseCaseImpl
    ],
    exports: [UserService]
})
export class UserModule { }
