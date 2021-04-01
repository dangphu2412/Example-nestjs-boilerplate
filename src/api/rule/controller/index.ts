/**
 * Rename Role to @SpecifyName
 */

import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {RoleService} from '../../../modules/role/service';

@ApiTags('Role')
@Controller('Role')
export class RuleController {
    constructor(private service: RoleService) { }
}
