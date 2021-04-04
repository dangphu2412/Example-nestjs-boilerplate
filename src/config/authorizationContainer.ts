import {AuthorizationContainer} from '@packages/ufsaModel/core/security/AuthorizationLookup';
import {Rules} from '../rules';

export const authorizationContainer =
   AuthorizationContainer
       .builder()
       .applyRules(Rules);
