import {Entity, Column, Unique, JoinTable, ManyToMany} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

import {EntityTemplate} from './base';
import {Role} from '.';
import {Gender} from '../common/enums/gender';
import {USER_STATUS} from '../common/enums/user.enum';

interface JsonCreateUser {
    username: string,
    password: string,
    email: string,
    gender: Gender,
    status: USER_STATUS,
}

@Entity('users')
@Unique(['username'])
export class User extends EntityTemplate {
    @ApiProperty()
    @Column({
        name: 'username'
    })
    public username: string

    @ApiProperty()
    @Column({
        name: 'email'
    })
    public email: string;

    @ApiProperty()
    @Column({
        name: 'password'
    })
    public password: string

    @ApiProperty()
    @Column({
        name: 'avatar'
    })
    public avatar: string;

    @ApiProperty()
    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender
    })
    public gender: Gender;

    @ApiProperty()
    @Column({
        name: 'status',
        type: 'enum',
        enum: USER_STATUS,
        default: USER_STATUS.ACTIVE
    })
    public status: USER_STATUS;

    /**
     * Associations
     */

    @ApiProperty({readOnly: true})
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'users_roles',
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

    static builder() {
        return new User();
    }

    appendJsonDto(obj: JsonCreateUser) {
        this.username = obj.username;
        this.password = obj.password;
        this.email = obj.email;
        this.gender = obj.gender;
        this.status = obj.status;
        return this;
    }
}
