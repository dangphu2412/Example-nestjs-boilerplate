import {EntityRepository} from 'typeorm';
import {User} from 'src/entities';
import {TypeormRepositoryBaseImpl} from '@packages/restBuilder/core/RepositoryBuilder/TypeormRepositoryImpl';

@EntityRepository(User)
export class UserRepository extends TypeormRepositoryBaseImpl<User> {
    public findByUsernameWithRoles(username: string) {
        return this.findOne({
            where: {
                username
            },
            relations: ['roles']
        });
    }
}
