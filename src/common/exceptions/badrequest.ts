import {HttpException, HttpStatus} from '@nestjs/common';
import {ERROR_MSG} from '../constants';

export class BadRequestException extends HttpException {
    constructor(msg: string = ERROR_MSG.BAD_REQUEST) {
        super(msg, HttpStatus.BAD_REQUEST);
    }
}
