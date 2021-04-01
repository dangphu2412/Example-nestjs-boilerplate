import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {QueryContainer} from '@packages/restBuilder/core';

export const QueryFactory = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): QueryContainer => {
        const request = ctx.switchToHttp().getRequest();
        return new QueryContainer(request.query as RequestFormatType);
    },
);
