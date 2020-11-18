import * as nodemailer from 'nodemailer';

class Mail {
	mailer = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: "respondeae17@gmail.com",
			pass: "yjjbqnrwiyebwhxn"
		}
	});
}

export default new Mail;
