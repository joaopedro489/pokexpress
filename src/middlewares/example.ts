import { Request, Response, NextFunction } from 'express';

const example = (req: Request, res: Response, next: NextFunction)=>{
    console.log("Example for Middleware");
 	next();
}
export default example;
