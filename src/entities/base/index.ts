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
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty({readOnly: true})
    @CreateDateColumn()
    public createdAt: Date;

    @ApiProperty({readOnly: true})
    @UpdateDateColumn()
    public updatedAt: Date;

    @ApiProperty({readOnly: true})
    @DeleteDateColumn({nullable: true})
    public deletedAt: Date;
}
