import {Repository} from 'typeorm';
import {QueryContainer, TypeormRepositoryBase} from '@packages/restBuilder/core';
import {QueryBuilderImpl} from '@packages/restBuilder/modules/Builder/QueryBuilderImpl';

export abstract class TypeormRepositoryBaseImpl<T> extends Repository<T>
    implements TypeormRepositoryBase {

    findAll(content: QueryContainer) {
        return new QueryBuilderImpl(this, content)
            .addQueryContent(content.translate())
            .build()
            .executeMany();
    }

    findOneById(id: number, content: QueryContainer) {
        content.addFilter(`id|$eq|${id}`);
        return new QueryBuilderImpl(this, content)
            .addQueryContent(content.translate())
            .build()
            .executeOne();
    }
}
