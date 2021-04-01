import {Repository, SelectQueryBuilder} from 'typeorm';
import {PaginationBuilder} from '@packages/restBuilder/modules/Builder/PaginationBuilder';
import {SortBuilder} from '@packages/restBuilder/modules/Builder/SortBuilder';
import {Translator} from '@packages/restBuilder/modules/Translator';
import {FilterBuilder} from '@packages/restBuilder/modules/Builder/FilterBuilder';
import {SearchBuilder} from '@packages/restBuilder/modules/Builder/SearchBuilder';
import {AssociateBuilder} from '@packages/restBuilder/modules/Builder/AssociateBuilder';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {MainSchema} from '@packages/restBuilder/types/querySchema/MainSchema';
import {QueryBuilder} from '@packages/restBuilder/modules/Builder/QueryBuilder';

export class QueryBuilderImpl<T> extends QueryBuilder<T> {
    private paginationBuilder: PaginationBuilder<T>;

    private searchBuilder: SearchBuilder<T>;

    private filterBuilder: FilterBuilder<T>;

    private sortBuilder: SortBuilder<T>;

    private associateBuilder: AssociateBuilder<T>;

    private mainColumns: string[] = null;

    constructor(repository: Repository<T>, container: Translator<QueryContent>) {
        super(null);
        const content = container.translate();
        this.builder = this.initializeBuilder(repository, content.main);
        this.paginationBuilder = new PaginationBuilder(this.builder);
        this.filterBuilder = new FilterBuilder(this.builder);
        this.sortBuilder = new SortBuilder(this.builder);
        this.searchBuilder = new SearchBuilder(this.builder);
        this.associateBuilder = new AssociateBuilder(this.builder);
    }

    addQueryContent(content: QueryContent): this {
        this.paginationBuilder.addQueryContent(content);
        this.searchBuilder.addQueryContent(content);
        this.filterBuilder.addQueryContent(content);
        this.sortBuilder.addQueryContent(content);
        this.associateBuilder.addQueryContent(content)
        return this;
    }

    private initializeBuilder(repository: Repository<T>, mainSchema: MainSchema)
        : SelectQueryBuilder<T> {
        /**
         * Not passing any arguments for main table
         * so it will init with createQueryBuilder
         * only with default alias of entity
         */
        if (!mainSchema) return repository.createQueryBuilder();

        /**
         * Collect main table select fields to temporary
         * variable mainColumns for adding after joining
         */
        if (mainSchema.fields) this.mainColumns = mainSchema.fields;

        /**
         * Create queryBuilder with alias
         */
        if (mainSchema.alias) return repository.createQueryBuilder(mainSchema.alias);
    }

    build(): this {
        this.paginationBuilder.build();
        this.sortBuilder.build();
        this.filterBuilder.build();
        this.associateBuilder
            .init()
            .addMainColumns(this.mainColumns)
            .build()
        return this;
    }

    executeMany() {
        return this.builder.getMany();
    }

    executeOne() {
        return this.builder.getOne();
    }
}
