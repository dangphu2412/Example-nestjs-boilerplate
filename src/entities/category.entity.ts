import {Entity, Column, ManyToOne, JoinColumn, Unique} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

import {EntityTemplate} from './base';
import {User} from '.';

@Entity('categories')
@Unique(['name'])
export class Category extends EntityTemplate {
    @Column()
    public name: string

    /**
     * Relations
     */
    @ApiProperty({readOnly: true, type: () => User})
    @ManyToOne(() => User, User => User.categories)
    @JoinColumn({
        name: 'userId'
    })
    user: User;
}
