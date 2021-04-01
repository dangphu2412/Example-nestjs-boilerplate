import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';
import {KEY_QUERY_MAPPING_FORMAT_META} from '@packages/restBuilder/constants';
import {QueryTranslator} from '@packages/restBuilder/core';
import {RelationBuilderSchema} from '@packages/restBuilder/types/querySchema/RelationBuilderSchema';

export function RestBuilder(relationSchema: RelationBuilderSchema) {
    return applyDecorators(
        SetMetadata(KEY_QUERY_MAPPING_FORMAT_META, relationSchema),
        UseGuards(QueryTranslator)
    )
}
