import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import Database from './database/Database';

const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));



APP.get('/', (req: Request, res: Response) => {
	res.send({
		message: 'Hello world',
	});
});
APP.listen(process.env.PORT, async () => {
	if (await Database.connect()) {
		console.log('Database connected');
	}
	console.log(`API is running at ${process.env.PORT}`);
});
