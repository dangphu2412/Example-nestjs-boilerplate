import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AliasService } from "../service";
import { AliasController } from "../controller";
import { AliasRepository } from "../repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AliasRepository,
        ])
    ],
    controllers: [AliasController],
    providers: [
        AliasService,
    ],
    exports: [AliasService]
})
export class AliasModule { }
