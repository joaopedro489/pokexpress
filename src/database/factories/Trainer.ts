import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Trainer from '../../models/Trainer';
define(Trainer, (faker: typeof Faker) => {
	const trainer = new Trainer();
	trainer.name = faker.name.firstName();
	trainer.region = faker.address.city();
	trainer.password = "123456";
	trainer.email = faker.internet.email();
	return trainer;
});
