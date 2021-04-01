/**
 * Rename Alias to @SpecifyName
 */

import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AliasService } from "../service";

@ApiTags("Alias")
@Controller("Alias")
export class AliasController {
    constructor(private service: AliasService) { }
}
