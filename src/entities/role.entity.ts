import {Entity, Column, ManyToOne, OneToMany, JoinColumn, Unique, JoinTable, ManyToMany} from 'typeorm';
import {IsString, IsNumber, IsIn, IsEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {EntityTemplate} from './base';
import {User} from './user.entity';

/**
 * @role Replace role with the name of table
 * @description  Remove Unique decorator if not using (This is use for unique columns)
 * @augments Arrange follow by alphabet
 */
@Entity('roles')
@Unique(['name'])
export class Role extends EntityTemplate {

    @Column()
    public name: string

    /**
     * Relations
     */
    // @ApiProperty({readOnly: true, type: () => ToClass})
    // @ManyToOne(() =>ToClass, toClass => toClass.role)
    // @JoinColumn({
    //     name: "toId"
    // })
    // user: ToClass;

    // @ApiProperty({readOnly: true, type: () => ToClass})
    // @OneToMany(() => ToClass, toClass => toClass.from)
    // toClass: toClass[]

    @ApiProperty({readOnly: true})
    @ManyToMany(() => User, user => user.roles)
    users: User[]
}
