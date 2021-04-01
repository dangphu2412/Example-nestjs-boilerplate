import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Unique } from "typeorm";
import { IsString, IsNumber, IsIn, IsEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { EntityTemplate } from "./base";

/**
 * @alias Replace alias with the name of table
 * @description  Remove Unique decorator if not using (This is use for unique columns)
 * @augments Arrange follow by alphabet
 */
@Entity("alias")
@Unique(["name"])
export class Alias extends EntityTemplate {
    @IsOptional()
    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsString()
    @IsNumber()
    @IsArray(
        {
            message: "Customer message"
        }
    )
    @IsIn(["some values here"])
    /**
     * Custom validator: https://www.npmjs.com/package/class-validator#custom-validation-classes
     */
    @Column(
        /**
         * Various template column
         * {
         *   default: "Default name",
         *   enum: EnumHere,
         *   length: 255,
         *   nullable: true default false,
         *   name: "tr2A-name",
         *   unique: true
         * }
         */
    )
    public name: String

    /**
     * Relations
     */
    // @ApiProperty({readOnly: true, type: () => ToClass})
    // @ManyToOne(() =>ToClass, toClass => toClass.alias)
    // @JoinColumn({
    //     name: "toId"
    // })
    // user: ToClass;

    // @ApiProperty({readOnly: true, type: () => ToClass})
    // @OneToMany(() => ToClass, toClass => toClass.from)
    // toClass: toClass[]

    // @ApiProperty({ readOnly: true })
    // @ManyToMany(() => ToClass, toClass => toClass.alias)
    // @JoinTable({
    //     name: "from_to",
    //     joinColumn: {
    //         name: "fromId",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "toId",
    //         referencedColumnName: "id"
    //     }
    // })
    // toClasses: ToClass[]
}
