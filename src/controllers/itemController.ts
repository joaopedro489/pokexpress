import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import Item from '../models/Item';
import { validate } from 'class-validator';
export default{
    async createItem(req: Request, res: Response): Promise<Response>{
		const{
            name,
            price
        } = req.body;
        let item = new Item();
        item.name = name;
        item.price = Number(price);
        try{
            const errors = await validate(item);
            if (errors.length > 0) {
                throw errors;
            }
        }
        catch (err){
            return res.status(500).json(err + " ");
        }
        const itemRepository = getRepository(Item);
        try{
            await itemRepository.save(item);
        }
        catch(err){
            return res.status(500).json(err);
        }
        return res.status(201).json(item);
    },
    async index(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const itemRepository = getRepository(Item);
        try{
            const item = await itemRepository.findOneOrFail(id);
            return res.status(200).json(item);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async findAll(req: Request, res: Response): Promise<Response>{
        const itemRepository = getRepository(Item);
        try{
            const items = await itemRepository.find();
            return res.status(200).json(items);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async updateItem(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const itemRepository = getRepository(Item);
        try{

            const item = await itemRepository.findOneOrFail(id);
			if(req.body.name){
				item.name = req.body.name;
			}
			if(req.body.price){
				item.price = Number(req.body.price);
			}
			try{
	            const errors = await validate(item);
	            if (errors.length > 0) {
	                throw errors;
	            }
	        }
	        catch (err){
	            return res.status(500).json(err + " ");
	        }
			await itemRepository.save(item);
            return res.status(200).json(item);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async deleteItem(req:Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const itemRepository = getRepository(Item);
        try{
            await itemRepository.delete(id);
            return res.status(204).json("");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
}
