export interface Transformer<R, T> {
    transform(input: R): T;
}
