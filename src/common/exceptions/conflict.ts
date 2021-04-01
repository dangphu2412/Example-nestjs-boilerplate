import {HttpException, HttpStatus} from '@nestjs/common';
import {ERROR_MSG} from '../constants';

export class ConflictException extends HttpException {
    constructor(msg: string = ERROR_MSG.CONFLICT) {
        super(msg, HttpStatus.CONFLICT);
    }
}
