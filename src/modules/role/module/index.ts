import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RoleService} from '../service';
import {RuleController} from '../../../api/rule/controller';
import {RoleRepository} from '../repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleRepository
        ])
    ],
    controllers: [RuleController],
    providers: [
        RoleService
    ],
    exports: [RoleService]
})
export class RuleModule { }
