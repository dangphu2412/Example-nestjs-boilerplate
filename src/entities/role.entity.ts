import {Entity, Column, Unique, ManyToMany} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

import {EntityTemplate} from './base';
import {User} from './user.entity';
import {PRIORITY} from '../rules';

@Entity('roles')
@Unique(['name'])
export class Role extends EntityTemplate {

    @Column({name: 'name'})
    public name: string

    @Column({
        name: 'permissions',
        type: 'simple-array'
    })
    public permissions: string[]

    @Column({
        name: 'priority',
        enum: PRIORITY
    })
    public priority: PRIORITY;

    /**
     * Associations
     */

    @ApiProperty({readOnly: true})
    @ManyToMany(() => User, user => user.roles)
    users: User[]
}
