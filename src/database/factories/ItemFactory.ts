import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import Item from "../../models/Item";
define(Item, (faker: typeof Faker) => {
	const name = faker.name.jobArea();
	const price = faker.random.number();
	const item = new Item();
	item.name = name;
	item.price = price;
	return item;
})
