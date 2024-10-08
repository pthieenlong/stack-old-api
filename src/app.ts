import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import Database from './database/Database';
import mainRouter from './route/index.route';

const APP = express();

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
	console.log(`API is running at ${process.env.PORT}`);
});
