import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

import Database from './database/Database';
import mainRouter from './route/index.route';

const APP : Express = express();


APP.use(morgan('tiny'));
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(
	cors({
		origin: 'localhost:8080',
	}),
);

APP.use('/api', mainRouter);
APP.listen(process.env.PORT, async () => {
	if (await Database.connect()) {
		console.log('Database connected');
	}
	console.log(`API is running at http://localhost:${process.env.PORT}`);
});
