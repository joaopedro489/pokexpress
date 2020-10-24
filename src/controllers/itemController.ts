import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import Item from '../models/Item';
import { validate } from 'class-validator';
export default{
    async createItem(req: Request, res: Response){
        const{
            name,
            price
        } = req.body;
        let validatorItem = new Item();
        validatorItem.name = name;
        validatorItem.price = price;
        try{
            const errors = await validate(validatorItem);
            if (errors.length > 0) {
                throw new Error(`Validation failed!`);
            }
        }
        catch (err){
            return res.status(500).json(err);
        }
        const itemRepository = getRepository(Item);
        const item = itemRepository.create({
            name,
            price
        });
        try{
            await itemRepository.save(item);
        }
        catch(err){
            return res.status(500).json(err);
        }
        return res.status(201).json(item);
    },
    async index(req: Request, res: Response){
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
    async findAll(res: Response){
        const itemRepository = getRepository(Item);
        try{
            const items = await itemRepository.find();
            return res.status(200).json(items);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async updateItem(req: Request, res: Response){
        const { id } = req.params;
        const itemRepository = getRepository(Item);
        try{
            await itemRepository.update(id,
            req.body);
            const item = await itemRepository.findOneOrFail(id);
            return res.status(200).json(item);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    async deleteItem(req:Request, res: Response){
        const { id } = req.params;
        const itemRepository = getRepository(Item);
        try{
            await itemRepository.delete(id);
            return res.status(204);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },


}
