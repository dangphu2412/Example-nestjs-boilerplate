import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RuleModule} from './modules/role/module';
import {UserModule} from './modules/user/module';
import {typeOrmConfig} from '@config/typeorm.config';

@Module({
    imports: [
        UserModule,
        RuleModule,
        TypeOrmModule.forRoot(
            typeOrmConfig
        )
    ]
})
export class AppModule { }
