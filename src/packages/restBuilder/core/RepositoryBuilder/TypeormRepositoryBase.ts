import {QueryContainer} from '@packages/restBuilder/core';

export interface FindManyMetaData {
    currentPage: number;
    currentSize: number;
    totalPage: number;
    totalRecord: number;
}

export interface FindManyResponse {
    content: any;
    meta: FindManyMetaData;
    next: string;
    previous: string;
}

export interface TypeormRepositoryBase {
    findAll(content: QueryContainer): any;
    findOneById(id: number, content: QueryContainer): any;
    // createOne(data);
    // updateOne();
    // replaceOne();
    // permentlyDeleteOne();
    // softDeleteOne();
    // restoreOne();
}
