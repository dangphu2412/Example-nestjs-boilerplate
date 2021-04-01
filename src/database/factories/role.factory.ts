import Faker from 'faker';
import {Role} from '../../entities';
import {define} from 'typeorm-seeding';

define(Role, (faker: typeof Faker, context: { /**Props you want to pass in */ }) => {
    const model: Role = new Role();
    model.name = faker.name.lastName();
    return model;
});
