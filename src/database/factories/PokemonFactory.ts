import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import Pokemon from "../../models/Pokemon";
define(Pokemon, (faker: typeof Faker) => {
	const name = faker.name.title();
	const atk = faker.random.number()
	const hp = faker.random.number()
	const speed = faker.random.number()
	const pokemon = new Pokemon();
	pokemon.name = name;
	pokemon.hp = hp;
	pokemon.speed = speed;
	pokemon.atk = atk;
	return pokemon;
});
