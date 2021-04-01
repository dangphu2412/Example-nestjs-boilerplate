import {ListFilterType} from '@packages/restBuilder/types/factory/filterContentType';
import {Builder} from '@packages/restBuilder/modules/Builder/Builder';
import {FilterSign} from '@packages/restBuilder/enum/FilterEnum';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {QueryBuilder} from '@packages/restBuilder/modules/Builder/QueryBuilder';

export class FilterBuilder<T> extends QueryBuilder<T> implements Builder<void> {
    private static DEFAULT_PARAM = 'a';

    private filters: ListFilterType;

    addQueryContent(content: QueryContent): this {
        this.filters = content.filters;
        return this;
    }

    build(): void {
        if (this.filters.length === 0) return;

        const isFirstCondition = true;
        let countParam = 0;

        this.filters.forEach(item => {
            let finalWhereQuery: string;
            const filterJoinTable: string[] = item.column.split('.');
            const isMainTableCol = filterJoinTable.length === 1;
            const currentParam = `${FilterBuilder.DEFAULT_PARAM}${countParam}`;

            if (isMainTableCol) {
                finalWhereQuery =
                    // eslint-disable-next-line max-len
                    `${this.builder.alias}.${item.column} ${FilterSign[item.sign]} :${currentParam}`;
            } else {
                finalWhereQuery =
                    `${item.column} ${FilterSign[item.sign]} :${currentParam}`;
            }

            countParam += 1;
            const params: { [key: string]: any } = {};
            params[`${currentParam}`] = item.value;

            if (isFirstCondition) {
                this.builder.where(finalWhereQuery, params);
            } else {
                this.builder.andWhere(finalWhereQuery, params);
            }
        });
    }

}
