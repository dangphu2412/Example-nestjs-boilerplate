import {Repository, EntityRepository} from 'typeorm';
import {Category} from 'src/entities';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
}
