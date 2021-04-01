import {applyDecorators} from '@nestjs/common';
import {ApiQuery} from '@nestjs/swagger';

export function ApiQuerySchema() {
    return applyDecorators(
        ApiQuery({
            name: 'page',
            description: 'Page for pagination',
            allowEmptyValue: true,
            required: false
        }),
        ApiQuery({
            name: 'size',
            description: 'Size for pagination',
            allowEmptyValue: true,
            required: false
        }),
        ApiQuery({
            name: 'sort',
            description: 'Sort for pagination',
            allowEmptyValue: true,
            required: false,
            isArray: true
        }),
        ApiQuery({
            name: 'filter',
            description: 'Filter for pagination',
            allowEmptyValue: true,
            required: false,
            isArray: true
        }),
    )
}
