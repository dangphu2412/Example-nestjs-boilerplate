import {
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
/**
 * Base entity with create, udpate, delete column
 */
export abstract class EntityTemplate extends BaseEntity {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @ApiProperty({readOnly: true})
    @CreateDateColumn({name: 'createdDate'})
    public createdDate: Date;

    @ApiProperty({readOnly: true})
    @UpdateDateColumn({name: 'updatedDate'})
    public updatedDate: Date;

    @ApiProperty({readOnly: true})
    @DeleteDateColumn({name: 'deletedDate', nullable: true})
    public deletedDate: Date;
}
