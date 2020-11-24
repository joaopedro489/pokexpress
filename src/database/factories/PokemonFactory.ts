import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import Pokemon from "../../models/Pokemon";
define(Pokemon, (faker: typeof Faker) => {
	const pokemon = new Pokemon();
	pokemon.name = faker.name.title();
	pokemon.hp = faker.random.number();
	pokemon.speed = faker.random.number();
	pokemon.atk = faker.random.number();
	return pokemon;
});
