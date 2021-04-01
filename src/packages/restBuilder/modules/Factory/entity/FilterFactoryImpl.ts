import {ListFilterType} from '@packages/restBuilder/types/factory/filterContentType';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {FilterValidator} from '@packages/restBuilder/modules/Validator/entity/FilterValidator';
import {FilterFactory} from '@packages/restBuilder/modules/Factory/FilterFactory';
import {FilterSignType} from '@packages/restBuilder/enum/FilterEnum';
import {Logger} from '@nestjs/common';

export class FilterFactoryImpl implements FilterFactory {
    private static logger: Logger = new Logger(FilterFactoryImpl.name);

    private static filterValidator: FilterValidator = new FilterValidator();

    constructor() {
        FilterFactoryImpl.logger.log(`${FilterFactoryImpl.name} factory is built`);
    }

    produce(req: any): ListFilterType {
        return this.transform(req);
    }

    transform(input: RequestFormatType): ListFilterType {
        const {filter} = input;
        let listFilter = [] as ListFilterType;

        if (!filter || filter.length === 0) return listFilter;

        if (typeof filter === 'string') {
            listFilter.push(this.transformOne(filter));
            return listFilter;
        }

        if (typeof filter === 'object') {
            listFilter = filter.map(item => this.transformOne(item));
        }

        return listFilter;
    }

    transformOne(filter: string) {
        const filterItems = filter.split('|');

        FilterFactoryImpl.filterValidator.validate(filterItems);

        return {
            column: filterItems[0],
            sign: filterItems[1] as FilterSignType,
            value: filterItems[2]
        }
    }
}
