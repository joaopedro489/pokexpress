import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import Item from "../../models/Item";
define(Item, (faker: typeof Faker) => {
	const item = new Item();
	item.name = faker.name.jobArea();
	item.price = faker.random.number();
	return item;
})
