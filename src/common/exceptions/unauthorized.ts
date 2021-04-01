import {HttpException, HttpStatus} from '@nestjs/common';
import {ERROR_MSG} from '../constants';

export class UnauthorizedException extends HttpException {
    constructor(msg: string = ERROR_MSG.UNAUTHORIZED) {
        super(msg, HttpStatus.UNAUTHORIZED);
    }
}
