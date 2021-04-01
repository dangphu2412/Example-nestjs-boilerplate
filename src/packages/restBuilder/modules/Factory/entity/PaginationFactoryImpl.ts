import {BadRequestException} from '@common/exceptions';
import {PaginationFactory} from '@packages/restBuilder/modules/Factory/PaginationFactory';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {PaginationContent} from '@packages/restBuilder/types/factory/paginationContentType';
import {ConfigContext} from '@packages/restBuilder/modules/Context/ConfigContext';
import {BaseListener} from '@packages/restBuilder/modules/Listener/BaseListener';
import {Logger} from '@nestjs/common';

export class PaginationFactoryImpl extends BaseListener implements PaginationFactory {
    private static logger: Logger = new Logger(PaginationFactoryImpl.name);

    static DEFAULT_RADIX = 10;

    static MAX_PAGE: number = null;

    static MAX_SIZE: number = null;

    constructor() {
        super();
        PaginationFactoryImpl.logger.log(`${PaginationFactoryImpl.name} factory is built`);
    }

    produce(req: any): PaginationContent {
        return this.transform(req);
    }

    transform(input: RequestFormatType): PaginationContent {
        let parsedPage = Number.parseInt(input.page, PaginationFactoryImpl.DEFAULT_RADIX);
        let parsedSize = Number.parseInt(input.size, PaginationFactoryImpl.DEFAULT_RADIX);

        if (Number.isNaN(parsedPage)) {
            if (!PaginationFactoryImpl.MAX_PAGE) {
                throw new BadRequestException('Page is not a number');
            }
            parsedPage = PaginationFactoryImpl.MAX_PAGE;
        }

        if (Number.isNaN(parsedSize)) {
            if (!PaginationFactoryImpl.MAX_SIZE) {
                throw new BadRequestException('Size is not a number');
            }
            parsedSize = PaginationFactoryImpl.MAX_SIZE;
        }

        return {
            page: parsedPage,
            size: parsedSize
        }
    }

    static receive(obj: ConfigContext): void {
        PaginationFactoryImpl.MAX_PAGE = obj.MAX_PAGE;
        PaginationFactoryImpl.MAX_SIZE = obj.MAX_SIZE;
    }

}
