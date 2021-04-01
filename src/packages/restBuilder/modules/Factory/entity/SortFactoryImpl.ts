import {SortDirection, SortDirectionType} from '@packages/restBuilder/enum/SortEnum';
import {ListSortType, SortContentType} from '@packages/restBuilder/types/factory/sortContentType';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {SortFactory} from '@packages/restBuilder/modules/Factory/SortFactory';
import {Logger} from '@nestjs/common';

export class SortFactoryImpl implements SortFactory {
    private static logger: Logger = new Logger(SortFactoryImpl.name);

    constructor() {
        SortFactoryImpl.logger.log(`${SortFactoryImpl.name} factory is built`);
    }

    produce(req: any): ListSortType {
        return this.transform(req);
    }

    transform(input: RequestFormatType): ListSortType {
        const {sort} = input;
        let listSortResult = [] as ListSortType;

        if (!sort || sort.length === 0) return listSortResult;

        if (typeof sort === 'string') {
            listSortResult.push(SortFactoryImpl.transformOne(sort));
        }

        if (typeof sort === 'object' && sort.length > 0) {
            listSortResult = sort.map(item => SortFactoryImpl.transformOne(item));
        }

        return listSortResult;
    }

    private static transformOne(sort: string): SortContentType {
        const sortSchema: SortContentType = {
            sort: '',
            order: SortDirection['-']
        };
        const signCharacter = sort[0] as SortDirectionType;
        const isDescendingDirection = SortDirection[signCharacter] === SortDirection['-'];

        if (isDescendingDirection) {
            sortSchema.sort = sort.slice(1, sort.length);
            return sortSchema;
        }

        sortSchema.sort = sort;
        sortSchema.order = SortDirection['+'];

        return sortSchema;
    }
}
