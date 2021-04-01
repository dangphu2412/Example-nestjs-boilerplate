import {IsString} from 'class-validator';

export class DefaultLogin {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
