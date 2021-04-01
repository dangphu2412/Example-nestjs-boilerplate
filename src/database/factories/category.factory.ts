import Faker from 'faker';
import {Category} from '../../entities';
import {define} from 'typeorm-seeding';

define(Category, (faker: typeof Faker, context: { /**Props you want to pass in */ }) => {
    const model = new Category();
    model.name = faker.name.jobTitle();
    return model;
});
