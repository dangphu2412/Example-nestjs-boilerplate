import {Entity, Column, OneToMany, Unique, JoinTable, ManyToMany} from 'typeorm';
import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {EntityTemplate} from './base';
import {Role, Category} from '.';

@Entity('users')
@Unique(['username'])
export class User extends EntityTemplate {
    @Column()
    public username: string

    @IsString()
    @Column()
    public password: string

    /**
     * Associations
     */

    @ApiProperty({readOnly: true})
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id'
        }
    })
    roles: Role[]

    @ApiProperty({readOnly: true, type: () => User})
    @OneToMany(() => Category, category => category.user)
    categories: Category[];
}
