import {BadRequestException} from '@common/exceptions';
import {OptionalValidator} from '@packages/restBuilder/modules/Validator/OptionalValidator';

export class LengthValidator implements OptionalValidator<string[]> {
    private readonly message: string;

    private readonly lengthValidate: number;

    constructor(lengthValidate: number, message?: string) {
        this.lengthValidate = lengthValidate;
        message ? this.message = message
            : this.message = `Input format should be contain ${this.lengthValidate} character`;
    }

    validate(obj: string[]): void {
        if (obj.length !== this.lengthValidate) {
            throw new BadRequestException(this.message);
        }
    }
}
