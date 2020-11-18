import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Trainer from '../../models/Trainer';
define(Trainer, (faker: typeof Faker) => {
	const name = faker.name.firstName();
	const region = faker.address.city();
	const password = faker.lorem.word();
	const email = faker.internet.email();
	const trainer = new Trainer();
	trainer.name = name;
	trainer.region = region;
	trainer.password = password;
	trainer.email = email;
	return trainer;
});
