import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from 'src/entities';
import {CategoryRepository} from '../repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private moduleRepository: CategoryRepository,
    ) { }
}
