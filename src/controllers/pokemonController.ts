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
        let validatorPokemon= new Pokemon();
        validatorPokemon.name = name;
        validatorPokemon.atk = atk;
        validatorPokemon.hp = hp;
        validatorPokemon.speed = speed;
        try{
            const errors = await validate(validatorPokemon);
            if (errors.length > 0) {
                throw new Error(`Validation failed!`);
            }
        }
        catch (err){
            return res.status(500).json("Validator Erros");
        }
        const pokemonRepository = getRepository(Pokemon);
        const pokemon = pokemonRepository.create({
            name,
            atk,
            hp,
            speed
        });
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
    async findAll(res: Response): Promise<Response>{
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
            await pokemonRepository.update(id,
            req.body);
            const pokemon = await pokemonRepository.findOneOrFail(id);
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
            return res.status(204);
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
}
