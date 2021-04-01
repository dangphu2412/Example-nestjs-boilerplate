import {SearchFactory} from '@packages/restBuilder/modules/Factory/SearchFactory';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {Logger} from '@nestjs/common';

export class SearchFactoryImpl implements SearchFactory {
    private static logger: Logger = new Logger(SearchFactoryImpl.name);

    static REGEX_SEARCH_CLEANER = '/[^\\w\\s]/gi';

    constructor() {
        SearchFactoryImpl.logger.log(`${SearchFactoryImpl.name} factory is built`);
    }


    produce(req: RequestFormatType): string {
        const {search} = req;

        if (!search || search.length === 0) return null;

        return (search as string).replace(
            SearchFactoryImpl.REGEX_SEARCH_CLEANER,
            ''
        );
    }

}
