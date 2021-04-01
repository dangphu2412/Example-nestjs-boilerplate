/**
 * Rename Category to @SpecifyName
 */

import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CategoryService} from '../service';

@ApiTags('Category')
@Controller('Category')
export class CategoryController {
    constructor(private service: CategoryService) { }
}
