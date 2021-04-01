import {OptionalQuery} from '@packages/restBuilder/types/factory/optionalQuery';
import {AssociateSchema} from '@packages/restBuilder/types/querySchema/AssociateSchema';
import {MainSchema} from '@packages/restBuilder/types/querySchema/MainSchema';

export interface RequestFormatType {
    page: string | undefined | null;
    size: string | undefined | null;
    sort: OptionalQuery;
    filter: OptionalQuery;
    search: OptionalQuery;
    main: MainSchema;
    associates: AssociateSchema[];
}
