/**
 * Rename User to @SpecifyName
 */

import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {UserService} from '../../../modules/user/service';
import {QueryContainer} from '@packages/restBuilder/core/QueryContainer';
import {QueryFactory} from '@packages/restBuilder/decorators/queryFactory';
import {ApiQuerySchema} from '@packages/restBuilder/decorators/apiQuerySchema';
import {RestBuilder} from '@packages/restBuilder/decorators/restBuilder';
import {AuthContext} from '@packages/ufsaModel/decorators/AuthContext';
import {CustomUserDetail} from '../../../modules/user/dto/CustomUserDetail';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private service: UserService) { }

    @Get()
    @ApiBearerAuth()
    @ApiQuerySchema()
    @RestBuilder({
        main: {
            alias: 'users',
            fields: ['id', 'username', 'password']
        },
        associates: [
            {
                table: 'roles',
                fields: ['id', 'name']
            }
        ]
    })
    getAll(
      @QueryFactory() query: QueryContainer,
      @AuthContext() user: CustomUserDetail
    ) {
        return this.service.findAll(user, query);
    }
}
