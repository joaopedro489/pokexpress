import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from "jsonwebtoken";
import auth from "../config/auth";
const authentication = (req: Request, res: Response, next: NextFunction)=>{
	const header = req.headers.authorization;
	if(!header){
		return res.status(401).json({error: "Token não existe"});
	}
	let token = header.split(" ");
	try{
		const tokenDecoded = jsonwebtoken.verify(token[1], auth.secret);
		req.id = tokenDecoded.id;
		return next();
	} catch (err){
		return res.status(403).json(err);
	}
}
export default authentication;
