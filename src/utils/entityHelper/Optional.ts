import {HttpException} from '@nestjs/common';

export class Optional<T extends Array<T> | Record<any, any> | string> {
    private readonly content: T;

    private canGet = false;

    static of(obj: any) {
        return new Optional(obj);
    }

    constructor(obj: any) {
        this.content = obj;
    }

    get() {
        return this.content;
    }

    isEmpty() {
        return !this.content || this.content?.length === 0
    }

    getIfPresent(): this | any {
        if (this.isEmpty()) {
            return this;
        }
        this.canGet = true;
        return this;
    }

    orElseThrow(supplier: () => HttpException): T {
        if (this.canGet) {
            return this.content;
        }
        throw supplier();
    }

    orElse(value: any) {
        return this.isEmpty() ? value : this.content;
    }
}

