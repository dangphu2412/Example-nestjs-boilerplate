import {LengthValidator} from '@packages/restBuilder/modules/Validator/entity/LengthValidator';
import {OptionalValidator} from '@packages/restBuilder/modules/Validator/OptionalValidator';
import {FilterSignValidator} from '@packages/restBuilder/modules/Validator/entity/FilterSignValidator';

export class FilterValidator implements OptionalValidator<string[]> {
    private readonly listValidator: Array<OptionalValidator<string[]>> = [];

    constructor() {
        this.listValidator.push(
            new LengthValidator(3, 'Filter format is not valid')
        );
        this.listValidator.push(new FilterSignValidator());
    }

    validate(obj: string[]): void {
        this.listValidator.forEach(item => {
            item.validate(obj);
        })
    }
}
