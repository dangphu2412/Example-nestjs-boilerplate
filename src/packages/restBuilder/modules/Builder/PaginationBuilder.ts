import {getConnection} from 'typeorm';
import {Builder} from '@packages/restBuilder/modules/Builder/Builder';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {QueryBuilder} from '@packages/restBuilder/modules/Builder/QueryBuilder';

export class PaginationBuilder<T> extends QueryBuilder<T> implements Builder<void>{
    private limit: number;

    private offset: number;

    addQueryContent(content: QueryContent): this {
        /**
         * Limit can be null so:
         * TODO: I will check it when generate builder
         */
        this.limit = content.pagination.size;

        if (!content.pagination.size && !content.pagination.page) {
            this.offset = (content.pagination.page - 1) * content.pagination.size;
        } else {
            this.offset = null;
        }
        return this;
    }

    build(): void {
        const subBuilder = getConnection().createQueryBuilder()
            .select(this.builder.alias)
            .from(sub => {
                return sub.from(this.builder.alias, this.builder.alias)
                    .limit(this.limit)
                    .offset(this.offset)
            }, this.builder.alias)

        this.builder.expressionMap.mainAlias.subQuery =
            subBuilder.expressionMap.mainAlias.subQuery;
    }
}
