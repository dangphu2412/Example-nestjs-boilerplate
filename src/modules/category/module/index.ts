import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoryService} from '../service';
import {CategoryController} from '../controller';
import {CategoryRepository} from '../repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoryRepository
        ])
    ],
    controllers: [CategoryController],
    providers: [
        CategoryService
    ],
    exports: [CategoryService]
})
export class CategoryModule { }
