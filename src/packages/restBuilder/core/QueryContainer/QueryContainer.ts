import {SearchFactory} from '@packages/restBuilder/modules/Factory/SearchFactory';
import {PaginationFactoryImpl} from '@packages/restBuilder/modules/Factory/entity/PaginationFactoryImpl';
import {SearchFactoryImpl} from '@packages/restBuilder/modules/Factory/entity/SearchFactoryImpl';
import {Translator} from '@packages/restBuilder/modules/Translator';
import {SortFactoryImpl} from '@packages/restBuilder/modules/Factory/entity/SortFactoryImpl';
import {PaginationFactory} from '@packages/restBuilder/modules/Factory/PaginationFactory';
import {FilterFactoryImpl} from '@packages/restBuilder/modules/Factory/entity/FilterFactoryImpl';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {QueryContent} from '@packages/restBuilder/types/factory/queryContent';
import {FilterFactory} from '@packages/restBuilder/modules/Factory/FilterFactory';
import {SortFactory} from '@packages/restBuilder/modules/Factory/SortFactory';

export class QueryContainer implements Translator<QueryContent> {
    private readonly content: QueryContent;

    private static paginationFactory: PaginationFactory = new PaginationFactoryImpl();

    private static sortFactory: SortFactory = new SortFactoryImpl();

    private static filterFactory: FilterFactory = new FilterFactoryImpl();

    private static searchFactory: SearchFactory = new SearchFactoryImpl();

    constructor(req: RequestFormatType) {
        this.content = {} as QueryContent;
        this.content.pagination = QueryContainer.paginationFactory.produce(req);
        this.content.filters = QueryContainer.filterFactory.produce(req);
        this.content.sorts = QueryContainer.sortFactory.produce(req);
        this.content.search = QueryContainer.searchFactory.produce(req);
        this.content.main = req.main;
        this.content.associates = req.associates;
    }

    public setPage(page: number): this {
        this.content.pagination.page = page;
        return this;
    }

    public setSize(size: number): this {
        this.content.pagination.size = size;
        return this;
    }

    public clearPage(): this {
        this.content.pagination.page = null;
        return this;
    }

    public clearSize(): this {
        this.content.pagination.size = null;
        return this;
    }

    public addSort(input: string): this {
        this.content.sorts.push(
            QueryContainer.sortFactory.produce(input)[0]
        );
        return this;
    }

    public addFilter(input: string): this {
        this.content.filters.push(
            QueryContainer.filterFactory.produce(input)[0]
        );
        return this;
    }

    public addSearch(input: string): this {
        // TODO: develop search
        return this;
    }

    public translate(): QueryContent {
        return this.content;
    }
}
