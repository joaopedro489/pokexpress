import { Factory, Seeder } from 'typeorm-seeding';
import Trainer from '../../models/Trainer';
import Pokemon from '../../models/Pokemon';
import Item from '../../models/Item';
export default class trainerSeed implements Seeder{
	public async run(factory: Factory): Promise<void>{
		await factory(Trainer)() .map(async (trainer: Trainer) => {
			trainer.pokemon = [];
			trainer.items = [];
    		const pokemons: Pokemon[] = await factory(Pokemon)().createMany(2);
			pokemons.forEach(pokemon => {
				trainer.pokemon.push(pokemon);
			});
			trainer.favoritePokemon = pokemons[0];
			const items: Item[] = await factory(Item)().createMany(2);
			items.forEach(item => {
				trainer.items.push(item);
			});
			const rival: Trainer = await factory(Trainer)().create();
			trainer.trainer = rival;
			return trainer;
  		}).createMany(10);
	}
}
