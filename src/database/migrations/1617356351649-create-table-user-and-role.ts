import {MigrationInterface, QueryRunner, Table, TableIndex, TableUnique} from 'typeorm';

export class createTableUserAndRole1617356351649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        /*
        ==================== Constraints ===========================
         */
        const userTableConstraints = new TableUnique({
            columnNames: ['username']
        });

        const roleTableConstraints = new TableUnique({
            columnNames: ['name']
        });

        /*
        Indexes
         */
        const userRolesIndexes = new TableIndex({
            columnNames: ['userId', 'roleId']
        })
        /*
        ==================== Constraints ===========================
        */


        /*
        Create user table
         */
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'username',
                    type: 'varchar'
                }, {
                    name: 'email',
                    type: 'varchar'
                }, {
                    name: 'password',
                    type: 'varchar'
                }, {
                    name: 'gender',
                    type: 'int'
                }, {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: true
                }, {
                    name: 'status',
                    type: 'int'
                }, {
                    name: 'createdDate',
                    type: 'date',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedDate',
                    type: 'date',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'deletedDate',
                    type: 'date',
                    default: null,
                    isNullable: true
                }
            ]
        }));

        /*
        Create role table
         */
        await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'permissions',
                    type: 'text'
                },
                {
                    name: 'priority',
                    type: 'int'
                }, {
                    name: 'createdDate',
                    type: 'date',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedDate',
                    type: 'date',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'deletedDate',
                    type: 'date',
                    default: null,
                    isNullable: true
                }
            ]
        }));

        /*
        Create users_roles
         */
        await queryRunner.createTable(new Table({
            name: 'users_roles',
            columns: [
                {
                    name: 'userId',
                    type: 'int'
                },
                {
                    name: 'roleId',
                    type: 'int'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users'
                },
                {
                    columnNames: ['roleId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'roles'
                }
            ]
        }));

        /*
         Add constraints
         */
        await queryRunner.createUniqueConstraint('users', userTableConstraints);
        await queryRunner.createUniqueConstraint('roles', roleTableConstraints);

        /*
        Indexes
        */
        await queryRunner.createIndex('users_roles', userRolesIndexes);
        await queryRunner.commitTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
