import Faker from 'faker';
import {User} from '../../entities';
import {define} from 'typeorm-seeding';
import {hashSync} from 'bcryptjs';

define(User, (faker: typeof Faker, context: { /**Props you want to pass in */ }) => {
    const model: User = new User();
    model.username = faker.name.firstName();
    model.password = hashSync('123123', 10);
    return model;
});
