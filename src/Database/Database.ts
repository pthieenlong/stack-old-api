import mongoose from 'mongoose';
export default class Database {
	public static async connect() {
		try {
			mongoose.set('strictQuery', false);
			await mongoose.connect(process.env.DATABASE_URL as string, {});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	public static async generateDefaultDatabase() {
		try {
		} catch (error) {
			console.log(`Errors: ${error}`);
		}
	}
}
