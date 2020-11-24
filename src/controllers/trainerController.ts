import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import Trainer from '../models/Trainer';
import  Item from "../models/Item";
import Pokemon from "../models/Pokemon";
import mailController from "./mailController";
import { validate } from 'class-validator';

export default{
    async createTrainer(req: Request, res: Response){
		const{
            name,
            region,
            password,
			email
        } = req.body;
        let validatorTrainer = new Trainer();
        validatorTrainer.name = name;
        validatorTrainer.region = region;
        validatorTrainer.password = password;
		validatorTrainer.email = email;
        try{
            const errors = await validate(validatorTrainer);
            if (errors.length > 0) {
                throw new Error(`Validation failed!`);
            }
        }
        catch (err){
            return res.status(500).json(err);
        }
        const trainerRepository = getRepository(Trainer);
        const trainer = trainerRepository.create({
            name,
            region,
            password,
			email
        });
        try{
            await trainerRepository.save(trainer);
			await mailController.trainerEmailRegister(trainer, res);
            return res.status(201).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async index(req: Request, res: Response){
        const { id } = req.params;
        const trainerRepository = getRepository(Trainer);
        try{
            const trainer = await trainerRepository.findOneOrFail(id,
                { relations: ["pokemon", "favoritePokemon", "trainer", "items"] } );

            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async findAll(req: Request,res: Response){
        const trainerRepository = getRepository(Trainer);
        try{
            const trainers = await trainerRepository.find({
                relations: ["pokemon", "favoritePokemon", "trainer", "items"] } );
            return res.status(200).json(trainers);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async updateTrainer(req: Request, res: Response){
        const { id } = req.body.id;
        const trainerRepository = getRepository(Trainer);
        try{
            await trainerRepository.update(id,
            req.body);
            const trainer = await trainerRepository.findOneOrFail(id);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async deleteTrainer(req:Request, res: Response){
        const { id } = req.params;
        const trainerRepository = getRepository(Trainer);
        try{
            await trainerRepository.delete(id);
            return res.status(204);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async buyItem(req: Request, res: Response): Promise<Response>{
        const itemRepository = getRepository(Item);
        const trainerRepository = getRepository(Trainer);
        try{
            const trainer = await trainerRepository.findOneOrFail(req.body.id,
                { relations: ["items"] } );
            const item = await itemRepository.findOneOrFail(req.params.itemId);
            trainer.items.push(item);
            await trainerRepository.update(trainer.id,
            trainer);
			await mailController.trainerEmailBuyItem(trainer, item, res);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async catchPokemon(req: Request, res: Response): Promise<Response>{
        const pokemonRepository = getRepository(Pokemon);
        const trainerRepository = getRepository(Trainer);
        try{
            const trainer = await trainerRepository.findOneOrFail(req.body.id,
                 { relations: ["pokemon"] } );
            const pokemon = await pokemonRepository.findOneOrFail(req.params.pokemonId);
            trainer.pokemon.push(pokemon);
            console.log(trainer);
            await trainerRepository.save(trainer);
			await mailController.trainerEmailCatchPokemon(trainer, pokemon, res);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async chooseRival(req: Request, res: Response): Promise<Response>{
        const trainerRepository = getRepository(Trainer);
        try{
            const trainer = await trainerRepository.findOneOrFail(req.body.id,
                 { relations: [ "trainer"] } );
            const rival = await trainerRepository.findOneOrFail(req.params.rivalId);
            trainer.trainer = rival;
            await trainerRepository.update(trainer.id,
            trainer);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async chooseFavoritePokemon(req: Request, res: Response): Promise<Response>{
        const pokemonRepository = getRepository(Pokemon);
        const trainerRepository = getRepository(Trainer);
        try{
            const trainer = await trainerRepository.findOneOrFail(req.body.id,
                { relations: ["favoritePokemon"] } );
            const pokemon = await pokemonRepository.findOneOrFail(req.params.pokemonId);
            trainer.favoritePokemon = pokemon;
            await trainerRepository.update(trainer.id,
            trainer);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async useItem(req: Request, res: Response): Promise<Response>{
        const trainerRepository = getRepository(Trainer);
        try{
            const trainer = await trainerRepository.findOneOrFail(req.body.id,
                { relations: [ "items"] } );
            trainer.items = trainer.items.filter(item => {
                item.id !== Number(req.params.itemId)
            })
            await trainerRepository.update(trainer.id, trainer);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async transferToProfessor(req: Request, res: Response): Promise<Response>{
        const trainerRepository = getRepository(Trainer);
        const pokeId = req.params.pokemonId;
        try{
            const trainer = await trainerRepository.findOneOrFail(req.body.id,
                { relations: [ "pokemon"] } );
            trainer.pokemon = trainer.pokemon.filter(pokemon => {
                return pokemon.id !== Number(pokeId);
            });
            await trainerRepository.save(trainer);
            return res.status(200).json(trainer);
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
}
