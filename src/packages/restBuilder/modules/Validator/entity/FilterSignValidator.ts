import {BadRequestException} from '@common/exceptions';
import {OptionalValidator} from '@packages/restBuilder/modules/Validator/OptionalValidator';
import {FilterSign, FilterSignType} from '@packages/restBuilder/enum/FilterEnum';

export class FilterSignValidator implements OptionalValidator<string[]> {
    validate(obj: string[]): void {
        const sign = obj[1] as FilterSignType;
        if (!FilterSign[sign]) throw new BadRequestException('Sign in filter is not valid');
    }
}
