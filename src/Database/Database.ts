import mongoose from 'mongoose';
export default class Database {
	public static async connect() : Promise<boolean> {
		try {
			mongoose.set('strictQuery', false);
			await mongoose.connect(process.env.DATABASE_URL as string, {});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	public static async generateDefaultDatabase() : Promise<boolean>{
		try {
			return true;
		} catch (error) {
			console.log(`Errors: ${error}`);
			return false;
		}
	}
}
