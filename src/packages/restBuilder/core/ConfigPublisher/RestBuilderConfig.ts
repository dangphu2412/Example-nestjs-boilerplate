import {ConfigPublisher} from '@packages/restBuilder/core/ConfigPublisher/ConfigPublisher';
import {PaginationFactoryImpl} from '@packages/restBuilder/modules/Factory/entity/PaginationFactoryImpl';

export const RestBuilderConfig = new ConfigPublisher()
    .addListener(PaginationFactoryImpl);
