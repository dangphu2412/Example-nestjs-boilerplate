import {AssociateSchema} from '@packages/restBuilder/types/querySchema/AssociateSchema';
import {MainSchema} from '@packages/restBuilder/types/querySchema/MainSchema';

export interface RelationBuilderSchema {
    main?: MainSchema;
    associates?: AssociateSchema[];
}
