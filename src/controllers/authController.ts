import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import auth from "../config/auth";
import {Response, Request} from "express";
import Trainer from "../models/Trainer";
import { getRepository } from 'typeorm';

export default{
	async login(req: Request,res: Response){
		const{
			email,
			password
		} = req.body;
		const trainerRepository = getRepository(Trainer);
		try{
			const trainer = await trainerRepository.findOneOrFail({ where: { email: email } });
			await bcrypt.compare(password, trainer.password);
			return res.status(200).json({token: jsonwebtoken.sign({id: trainer.id}, auth.secret, {expiresIn: "7d"})});
		} catch (err){
			return res.status(500).json(err);
		}
	},
	async getDetails(req: Request, res: Response){
		const trainerRepository = getRepository(Trainer);
		try{
			const trainer = await trainerRepository.findOneOrFail(req.body.id, {
				relations: ["pokemon", "favoritePokemon", "trainer", "items"]
			});
			return res.status(200).json(trainer);
		} catch (err){
			return res.status(500).json(err);
		}
	}
}
