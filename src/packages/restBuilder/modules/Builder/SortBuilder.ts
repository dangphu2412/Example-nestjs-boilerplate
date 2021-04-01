import {ListSortType} from '@packages/restBuilder/types/factory/sortContentType';
import {Builder} from '@packages/restBuilder/modules/Builder/Builder';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {QueryBuilder} from '@packages/restBuilder/modules/Builder/QueryBuilder';

export class SortBuilder<T> extends QueryBuilder<T> implements Builder<void> {
    private sorts: ListSortType;

    addQueryContent(content: QueryContent): this {
        this.sorts = content.sorts;
        return this;
    }

    build(): void {
        if (this.sorts.length === 0) return;

        let isFirstOrderBy = true;

        this.sorts.forEach(item => {
            let finalSortQuery: string;
            const sortColJoinTable: string[] = item.sort.split('.');
            const isMainTableCol = sortColJoinTable.length === 1;

            if (isMainTableCol) {
                finalSortQuery = `${this.builder.alias}.${item.sort}`;
            } else {
                finalSortQuery = item.sort;
            }

            if (isFirstOrderBy) {
                isFirstOrderBy = false;
                this.builder.orderBy(finalSortQuery, item.order);
            } else {
                this.builder.addOrderBy(finalSortQuery, item.order);
            }
        })
    }

}
