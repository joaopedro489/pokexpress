import Mail from "../config/mail";
import Trainer from "../models/Trainer";
import Pokemon from "../models/Pokemon";
import Item from "../models/Item";
import { Response } from 'express';

export default{
	async sendEmail(subject:string, text: string, email: string): Promise<any>{
		const message = {
            to: email,
            subject: subject,
            text: text
        };
		let bool = true;
		Mail.mailer.sendMail(message, (error) => {
			if (error){
				bool = false;
			}
		});
		return bool;
	},
	async trainerEmailRegister(trainer: Trainer, res: Response): Promise<any>{
		const subject = `Bem vindo ao site ${trainer.name}`;
		const text = `Bem vindo(a) ao site caro Treinador(a) ${trainer.name}, aproveite bem a sua estadia no site`;
		if(!this.sendEmail(subject, text, trainer.email)){
			return res.status(500).json("Erro ao enviar o email!");
		}
		return;
	},
	async trainerEmailCatchPokemon(trainer: Trainer, pokemon: Pokemon, res: Response): Promise<any>{
		const today = new Date();
		const subject = `Pokemon Capturado`;
		const text = `Parabains por ter capturado o pokemon ${pokemon.name} em ${trainer.region} no dia ${today.getDate()}/${today.getMonth()}/${today.getFullYear()} às ${today.getHours()}:${today.getMinutes()}`;
		if(!this.sendEmail(subject, text, trainer.email)){
			return res.status(500).json("Erro ao enviar o email!");
		}
		return;
	},
	async trainerEmailBuyItem(trainer: Trainer, item:Item, res: Response): Promise<any>{
		const today = new Date();
		const subject = `Item Comprado`;
		const text = `Você comprou o item ${item.name} no dia ${today.getDate()}/${today.getMonth()}/${today.getFullYear()} às ${today.getHours()}:${today.getMinutes()}`;
		if(!this.sendEmail(subject, text, trainer.email)){
			return res.status(500).json("Erro ao enviar o email!");
		}
		return;
	}
}
