export interface Factory<T> {
     produce(req: any): T;
}
