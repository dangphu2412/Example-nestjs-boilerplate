import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {KEY_QUERY_MAPPING_FORMAT_META} from '@packages/restBuilder/constants';
import {RelationBuilderSchema} from '@packages/restBuilder/types/querySchema/RelationBuilderSchema';

@Injectable()
export class QueryTranslator implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const relationSchema = this
            .reflector
            .get<RelationBuilderSchema>(KEY_QUERY_MAPPING_FORMAT_META, context.getHandler());
        const request = context.switchToHttp().getRequest();

        request.query.associates = relationSchema.associates;
        request.query.main = relationSchema.main;

        return true;
    }
}
