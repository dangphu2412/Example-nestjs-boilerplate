import {IsNumber} from 'class-validator';

export class ConfigContext {
    @IsNumber()
    public MAX_PAGE: number;

    @IsNumber()
    public MAX_SIZE: number;
}
