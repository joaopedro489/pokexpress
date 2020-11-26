import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import Pokemon from '../models/Pokemon';
import { validate } from 'class-validator';

export default{
    async createPokemon(req: Request, res: Response): Promise<Response>{
		const{
            name,
            atk,
            hp,
            speed
        } = req.body;
        let pokemon= new Pokemon();
        pokemon.name = name;
        pokemon.atk = Number(atk);
        pokemon.hp = Number(hp);
        pokemon.speed = Number(speed);
        try{
            const errors = await validate(pokemon);
            if (errors.length > 0) {
                throw errors;
            }
        }
        catch (err){
            return res.status(500).json(err + "");
        }
        const pokemonRepository = getRepository(Pokemon);
		if(req.file){
			pokemon.photo = "http://localhost:3335/uploads/" + req.file.filename;
		}
        try{
            await pokemonRepository.save(pokemon);
        }
        catch(err){
            return res.status(500).json(err);
        }
        return res.status(201).json(pokemon);
    },
    async index(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const pokemonRepository = getRepository(Pokemon);
        try{
            const pokemon = await pokemonRepository.findOneOrFail(id);
            return res.status(200).json(pokemon);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async findAll(req:Request, res: Response): Promise<Response>{
        const pokemonRepository = getRepository(Pokemon);
        try{
            const pokemons = await pokemonRepository.find();
            return res.status(200).json(pokemons);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async updatePokemon(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const pokemonRepository = getRepository(Pokemon);
        try{
			const pokemon = await pokemonRepository.findOneOrFail(id);
			if(req.file){
				pokemon.photo = "http://localhost:3335/uploads/" + req.file.filename;
			}
			if(req.body.name){
				pokemon.name = req.body.name;
			}
			if(req.body.atk){
				pokemon.atk = Number(req.body.atk);
			}
			if(req.body.hp){
				pokemon.hp = Number(req.body.hp);
			}
			if(req.body.speed){
				pokemon.speed = Number(req.body.speed);
			}
			try{
	            const errors = await validate(pokemon);
	            if (errors.length > 0) {
	                throw errors;
	            }
	        }
	        catch (err){
	            return res.status(500).json(err + "");
	        }
            await pokemonRepository.save(pokemon);
            return res.status(200).json(pokemon);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async deletePokemon(req:Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const pokemonRepository = getRepository(Pokemon);
        try{
            await pokemonRepository.delete(id);
            return res.status(204).json("");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
}
