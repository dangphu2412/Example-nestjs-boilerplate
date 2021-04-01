import {AssociateSchema} from '@packages/restBuilder/types/querySchema/AssociateSchema';
import {Builder} from '@packages/restBuilder/modules/Builder/Builder';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {TypeormJoinKey} from '@packages/restBuilder/enum/Associate.enum';
import {QueryBuilder} from '@packages/restBuilder/modules/Builder/QueryBuilder';

export class AssociateBuilder<T> extends QueryBuilder<T> implements Builder<void> {
    private mainColumns: string[] = null;

    private associates: AssociateSchema[];

    addQueryContent(content: QueryContent): this {
        this.associates = content.associates;
        return this;
    }

    /**
     * We have to add the main columns to finalize
     * because it s necessary when work with relation
     * in typeorm
     */
    build(): this {
        this.builder.addSelect(
            this.mainColumns.map(col => `${this.builder.alias}.${col}`)
        );
        return this;
    }

    addMainColumns(columns: string[]): this {
        if (!columns || columns.length === 0) return this;
        this.mainColumns = columns;
        return this;
    }

    init(): this {
        if (this.associates.length === 0) return this;

        const isFirstSelection = true;

        this.associates.forEach(item => {
            const joinTableName = `${this.builder.alias}.${item.table}`;
            const aliasTable = item.alias ? item.alias : item.table;

            const keyJoin: TypeormJoinKey = item.joinType
                ? 'innerJoinAndSelect'
                : 'leftJoinAndSelect';

            this.builder[keyJoin](joinTableName, aliasTable);

            if (item.fields.length > 0) {
                if (isFirstSelection) {
                    /**
                     * Need select first for typeorm init Select fields
                     */
                    this.builder.select(
                        item.fields.map(field => `${aliasTable}.${field}`)
                    );
                } else {
                    this.builder.addSelect(
                        item.fields.map(field => `${aliasTable}.${field}`)
                    );
                }
            }
        })

        return this;
    }
}
