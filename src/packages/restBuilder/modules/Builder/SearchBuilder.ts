import {OptionalQuery} from '@packages/restBuilder/types/factory/optionalQuery';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {QueryBuilder} from '@packages/restBuilder/modules/Builder/QueryBuilder';

export class SearchBuilder<T> extends QueryBuilder<T> {
    private search: OptionalQuery;

    addQueryContent(content: QueryContent): this {
        this.search = content.search;
        return this;
    }
}
