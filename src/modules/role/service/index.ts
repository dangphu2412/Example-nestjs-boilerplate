import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from 'src/entities';
import {RoleRepository} from '../repository';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private moduleRepository: RoleRepository,
    ) { }
}
