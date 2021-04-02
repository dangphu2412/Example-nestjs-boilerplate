import {MigrationInterface, QueryRunner} from 'typeorm';
import {ROLE} from '../../rules';
import {Role} from '../../entities';

export class initUserWithRacl1617356396033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(Object.keys(ROLE).map(key => {
            const roleEntity: Role = new Role();
            roleEntity.name = ROLE[key].name;
            roleEntity.permissions = ROLE[key].permissions;
            roleEntity.priority = ROLE[key].priority;
            return roleEntity.save({reload: false});
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
