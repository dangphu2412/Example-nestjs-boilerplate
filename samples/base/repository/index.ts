import { Repository, EntityRepository } from "typeorm";
import { Alias } from "src/entities";

@EntityRepository(Alias)
export class AliasRepository extends Repository<Alias> {
}
