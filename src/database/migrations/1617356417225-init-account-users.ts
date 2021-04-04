import {MigrationInterface, QueryRunner} from 'typeorm';
import {Role, User} from '../../entities';
import {Gender, USER_STATUS} from '../../common/enums';
import {BcryptSingleton} from '../../packages/ufsaModel/core/security/BcryptService';
import {ROLE} from '../../rules';

export class initAccountUsers1617356417225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const roles: Role[] = await queryRunner.manager.find(Role);

        const leaderData = User.builder()
            .appendJsonDto({
                email: 'admin@gmail.com',
                gender: Gender.MALE,
                password: BcryptSingleton.hash('qweasdzxc2412@@'),
                username: 'Fusdeptrai',
                status: USER_STATUS.ACTIVE
            });

        const leaderEntity = await queryRunner
            .manager
            .save(User, leaderData);

        leaderEntity.roles = [roles.find(role => role.name === 'LEADER')];

        await queryRunner.manager.save(User, leaderEntity);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
