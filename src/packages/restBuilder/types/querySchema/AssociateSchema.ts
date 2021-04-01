import {MainSchema} from '@packages/restBuilder/types/querySchema/MainSchema';
import {JoinType} from '@packages/restBuilder/enum/Associate.enum';

export interface AssociateSchema extends MainSchema {
    table: string;
    joinCondition?: any;
    joinType?: JoinType;
}
