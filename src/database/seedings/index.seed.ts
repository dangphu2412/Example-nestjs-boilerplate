import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {Category, Role, User} from '../../entities';
import * as faker from 'faker';

export default class Seeding implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const users = await factory(User)().createMany(10);
        const roles = await factory(Role)().createMany(10);
        await Promise.all(users.map(user => {
            user.roles = faker.random.arrayElements(roles);
            return user.save();
        }));
        await factory(Category)().createMany(10);
    }
}
