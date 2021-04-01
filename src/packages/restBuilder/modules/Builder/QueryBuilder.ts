import {SelectQueryBuilder} from 'typeorm';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';

export abstract class QueryBuilder<T> {
    protected builder: SelectQueryBuilder<T>;

    protected constructor(builder: SelectQueryBuilder<T>) {
        this.builder = builder;
    }

    abstract addQueryContent(content: QueryContent): this;
}
