import {HttpException, HttpStatus} from '@nestjs/common';
import {ERROR_MSG} from '../constants';

export class ForbiddenException extends HttpException {
    constructor(msg: string = ERROR_MSG.FORBIDDEN) {
        super(msg, HttpStatus.FORBIDDEN);
    }
}
