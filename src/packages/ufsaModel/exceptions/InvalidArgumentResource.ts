export class InvalidArgumentResource extends Error {
    constructor(propertyKey: string | symbol) {
        super(
            `First argument of method ${propertyKey.toString()} must be instance of UserDetail`
        );
    }
}
