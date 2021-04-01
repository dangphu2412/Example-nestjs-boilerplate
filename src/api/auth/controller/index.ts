/**
 * Rename User to @SpecifyName
 */

import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {DefaultLogin} from '../../../modules/user/dto/DefaultLogin';
import {UserLoginDetail} from '../../../modules/user/dto/UserLoginDetail';
import {LoginUseCaseImpl} from '../usecase';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private loginUseCase: LoginUseCaseImpl) { }

    @Post('login')
    public loginWithUsernameAndPassword(@Body() dto: DefaultLogin): UserLoginDetail {
        return this.loginUseCase.defaultLogin(dto);
    }
}
