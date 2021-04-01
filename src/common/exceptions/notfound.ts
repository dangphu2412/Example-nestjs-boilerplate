import {HttpException, HttpStatus} from '@nestjs/common';
import {ERROR_MSG} from '../constants';

export class NotFoundException extends HttpException {
    constructor(msg: string = ERROR_MSG.NOT_FOUND) {
        super(msg, HttpStatus.NOT_FOUND);
    }
}
