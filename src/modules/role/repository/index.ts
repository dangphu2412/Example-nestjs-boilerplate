import {Repository, EntityRepository} from 'typeorm';
import {Role} from 'src/entities';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
}
