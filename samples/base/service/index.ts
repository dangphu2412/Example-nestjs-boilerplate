import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Alias } from "src/entities";
import { AliasRepository } from "../repository";

@Injectable()
export class AliasService {
    constructor(
        @InjectRepository(Alias)
        private moduleRepository: AliasRepository,
    ) { }
}
