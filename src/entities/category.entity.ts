import {Entity, Column, Unique} from 'typeorm';

import {EntityTemplate} from './base';

@Entity('categories')
@Unique(['name'])
export class Category extends EntityTemplate {
    @Column()
    public name: string
}
