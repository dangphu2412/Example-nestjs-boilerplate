export interface Validator<T> {
    validate(obj: T): void;
}
